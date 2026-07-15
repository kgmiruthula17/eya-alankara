import { NextRequest, NextResponse } from "next/server";
import { getProducts, addProduct } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";

// Public — returns all products
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ products });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Admin only — add a new product
export async function POST(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, price, category, occasion, description, image } = body;

    if (!name || !price || !category || !occasion || !description) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, category, occasion, description" },
        { status: 400 }
      );
    }

    const product = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name,
      price: Number(price),
      category,
      occasion,
      description,
      image: image || "/necksets/1.png",
    };

    const created = await addProduct(product);
    return NextResponse.json({ product: created }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to add product";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
