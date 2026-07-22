/**
 * Seed script for Eya Alankara — Neon DB
 * Populates the products and categories tables with initial data.
 *
 * Usage:  npx tsx lib/seed.ts
 * Requires DATABASE_URL to be set in .env.local
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  products as productsTable,
  categories as categoriesTable,
} from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set. Add it to .env.local");
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

const seedProducts = [
  {
    id: "1",
    name: "Kundan Bridal Necklace Set",
    price: 999,
    category: "Necklace Sets",
    occasion: "Bridal",
    description:
      "Exquisite kundan necklace with matching earrings, handcrafted for the modern bride.",
    image: "/necksets/1.png",
  },
  {
    id: "2",
    name: "Temple Gold Choker",
    price: 899,
    category: "Necklace Sets",
    occasion: "Festive",
    description:
      "Traditional temple-inspired gold choker with intricate deity motifs.",
    image: "/necksets/2.png",
  },
  {
    id: "3",
    name: "Polki Diamond Haar",
    price: 1299,
    category: "Necklace Sets",
    occasion: "Bridal",
    description:
      "Stunning polki diamond long haar with emerald accents for the regal bride.",
    image: "/necksets/3.png",
  },
  {
    id: "4",
    name: "Lakshmi Coin Necklace",
    price: 699,
    category: "Necklace Sets",
    occasion: "Festive",
    description:
      "Iconic Lakshmi coin necklace in pure gold finish with matching studs.",
    image: "/necksets/4.png",
  },
  {
    id: "5",
    name: "Antique Gold Bangles Set",
    price: 599,
    category: "Bangles",
    occasion: "Festive",
    description:
      "Set of 6 antique finish gold bangles with traditional meenakari work.",
    image: "/bangles/1.png",
  },
  {
    id: "6",
    name: "Bridal Kada Collection",
    price: 799,
    category: "Bangles",
    occasion: "Bridal",
    description:
      "Heavy bridal kadas with kundan stones and pearl droplets.",
    image: "/bangles/2.png",
  },
  {
    id: "7",
    name: "Chandbali Pearl Earrings",
    price: 399,
    category: "Earrings",
    occasion: "Festive",
    description:
      "Crescent-shaped chandbali earrings adorned with freshwater pearls.",
    image: "/earrings/1.png",
  },
  {
    id: "8",
    name: "Jhumka Heritage Drops",
    price: 499,
    category: "Earrings",
    occasion: "Bridal",
    description:
      "Classic jhumka earrings with gold beads and traditional bell design.",
    image: "/earrings/2.png",
  },
  {
    id: "9",
    name: "Ruby Stud Earrings",
    price: 299,
    category: "Earrings",
    occasion: "Everyday",
    description:
      "Elegant ruby-studded gold earrings for refined daily wear.",
    image: "/earrings/3.png",
  },
];

const seedCategories = [
  { name: "Necklace Sets", image: "/necksets/1.png" },
  { name: "Bangles", image: "/bangles/1.png" },
  { name: "Earrings", image: "/earrings/1.png" },
  { name: "Bridal Collections", image: "/necksets/3.png" },
];

async function seed() {
  console.log("🌱 Seeding Neon database...\n");

  // Insert categories (skip duplicates)
  console.log("📁 Inserting categories...");
  for (const cat of seedCategories) {
    try {
      await db.insert(categoriesTable).values(cat).onConflictDoNothing();
      console.log(`   ✅ ${cat.name}`);
    } catch (err) {
      console.log(`   ⚠️  ${cat.name} — skipped (already exists)`);
    }
  }

  // Insert products (skip duplicates)
  console.log("\n📦 Inserting products...");
  for (const prod of seedProducts) {
    try {
      await db.insert(productsTable).values(prod).onConflictDoNothing();
      console.log(`   ✅ ${prod.name}`);
    } catch (err) {
      console.log(`   ⚠️  ${prod.name} — skipped (already exists)`);
    }
  }

  console.log("\n🎉 Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
