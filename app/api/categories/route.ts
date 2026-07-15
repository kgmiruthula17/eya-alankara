import { NextRequest, NextResponse } from "next/server";
import { getCategories, addCategory, deleteCategory } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";

// Public — returns all categories
export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ categories });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch categories";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Admin only — add a new category
export async function POST(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, image } = await request.json();
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const category = await addCategory({ name: name.trim(), image: image || undefined });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to add category";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// Admin only — delete a category
export async function DELETE(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteCategory(name);
    if (!deleted) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete category";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
