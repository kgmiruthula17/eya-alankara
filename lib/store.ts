/**
 * Server-side Data Store for Eya Alankara
 * Backed by Neon PostgreSQL via Drizzle ORM.
 * Preserves the same function signatures as the original JSON store
 * so API routes require zero changes.
 */

import { eq } from "drizzle-orm";
import { db } from "./db";
import { products as productsTable, categories as categoriesTable } from "./schema";
import type { Product } from "@/app/data/products";

export interface Category {
  name: string;
  image?: string;
}

export interface StoreData {
  products: Product[];
  categories: Category[];
}

// ─── Products ────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const rows = await db.select().from(productsTable);
  return rows as Product[];
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const rows = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id));
  return (rows[0] as Product) ?? undefined;
}

export async function addProduct(product: Product): Promise<Product> {
  await db.insert(productsTable).values({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    occasion: product.occasion,
    description: product.description,
    image: product.image,
  });
  return product;
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<Product | null> {
  // Build the update payload, excluding the id field
  const { id: _ignoredId, ...updateFields } = updates;

  const result = await db
    .update(productsTable)
    .set(updateFields)
    .where(eq(productsTable.id, id))
    .returning();

  if (result.length === 0) return null;
  return result[0] as Product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const result = await db
    .delete(productsTable)
    .where(eq(productsTable.id, id))
    .returning();
  return result.length > 0;
}

// ─── Categories ──────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const rows = await db.select().from(categoriesTable);
  return rows.map((r) => ({
    name: r.name,
    ...(r.image ? { image: r.image } : {}),
  }));
}

export async function addCategory(category: Category): Promise<Category> {
  // Drizzle will throw on PK conflict if the category already exists
  try {
    await db.insert(categoriesTable).values({
      name: category.name,
      image: category.image ?? null,
    });
  } catch {
    throw new Error(`Category "${category.name}" already exists`);
  }
  return category;
}

export async function deleteCategory(name: string): Promise<boolean> {
  const result = await db
    .delete(categoriesTable)
    .where(eq(categoriesTable.name, name))
    .returning();
  return result.length > 0;
}
