/**
 * Database Schema for Eya Alankara
 * Defines products and categories tables using Drizzle ORM.
 */

import { pgTable, text, integer } from "drizzle-orm/pg-core";

// ─── Products ────────────────────────────────────────────────

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  occasion: text("occasion").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
});

// ─── Categories ──────────────────────────────────────────────

export const categories = pgTable("categories", {
  name: text("name").primaryKey(),
  image: text("image"),
});
