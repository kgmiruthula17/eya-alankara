/**
 * Server-side JSON Store for Eya Alankara
 * Persists products and categories to a JSON file.
 * Falls back to seed data from products.ts if no store file exists.
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { products as seedProducts, type Product } from "@/app/data/products";

export interface Category {
  name: string;
  image?: string;
}

export interface StoreData {
  products: Product[];
  categories: Category[];
}

const STORE_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(STORE_DIR, "store.json");

const DEFAULT_CATEGORIES: Category[] = [
  { name: "Necklace Sets", image: "/necksets/1.png" },
  { name: "Bangles", image: "/bangles/1.png" },
  { name: "Earrings", image: "/earrings/1.png" },
  { name: "Bridal Collections", image: "/necksets/3.png" },
];

/**
 * Ensures the data directory and store file exist.
 * Seeds from hardcoded product data on first run.
 */
async function ensureStore(): Promise<void> {
  if (!existsSync(STORE_DIR)) {
    await mkdir(STORE_DIR, { recursive: true });
  }
  if (!existsSync(STORE_PATH)) {
    const initial: StoreData = {
      products: seedProducts,
      categories: DEFAULT_CATEGORIES,
    };
    await writeFile(STORE_PATH, JSON.stringify(initial, null, 2), "utf-8");
  }
}

async function readStore(): Promise<StoreData> {
  await ensureStore();
  const raw = await readFile(STORE_PATH, "utf-8");
  return JSON.parse(raw) as StoreData;
}

async function writeStore(data: StoreData): Promise<void> {
  await ensureStore();
  await writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// ─── Products ────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const store = await readStore();
  return store.products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const store = await readStore();
  return store.products.find((p) => p.id === id);
}

export async function addProduct(product: Product): Promise<Product> {
  const store = await readStore();
  store.products.push(product);
  await writeStore(store);
  return product;
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<Product | null> {
  const store = await readStore();
  const index = store.products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  store.products[index] = { ...store.products[index], ...updates, id };
  await writeStore(store);
  return store.products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const store = await readStore();
  const before = store.products.length;
  store.products = store.products.filter((p) => p.id !== id);
  if (store.products.length === before) return false;
  await writeStore(store);
  return true;
}

// ─── Categories ──────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const store = await readStore();
  return store.categories;
}

export async function addCategory(category: Category): Promise<Category> {
  const store = await readStore();
  // Prevent duplicates
  if (store.categories.some((c) => c.name === category.name)) {
    throw new Error(`Category "${category.name}" already exists`);
  }
  store.categories.push(category);
  await writeStore(store);
  return category;
}

export async function deleteCategory(name: string): Promise<boolean> {
  const store = await readStore();
  const before = store.categories.length;
  store.categories = store.categories.filter((c) => c.name !== name);
  if (store.categories.length === before) return false;
  await writeStore(store);
  return true;
}
