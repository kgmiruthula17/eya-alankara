"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Tags,
  Upload,
  X,
  AlertTriangle,
} from "lucide-react";

interface Category {
  name: string;
  image?: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});

  const fetchData = useCallback(() => {
    setLoading(true);
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/products").then((r) => r.json()),
    ])
      .then(([cData, pData]) => {
        setCategories(cData.categories || []);
        // Count products per category
        const counts: Record<string, number> = {};
        (pData.products || []).forEach((p: { category: string }) => {
          counts[p.category] = (counts[p.category] || 0) + 1;
        });
        setProductCounts(counts);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "eya_alankara/categories");
      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setNewImage(data.url);
      }
    } catch {
      // Silently fail
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, image: newImage || undefined }),
      });

      if (res.ok) {
        setNewName("");
        setNewImage("");
        setShowForm(false);
        fetchData();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add category");
      }
    } catch {
      setError("Connection error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (name: string) => {
    const count = productCounts[name] || 0;
    const msg =
      count > 0
        ? `"${name}" has ${count} product(s). Deleting the category won't delete products, but they'll become uncategorized. Continue?`
        : `Delete category "${name}"?`;

    if (!confirm(msg)) return;
    setDeleting(name);

    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) fetchData();
      else alert("Failed to delete category");
    } catch {
      alert("Delete error");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="admin-page-loading">
        <div className="admin-loading-spinner" />
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Categories</h1>
          <p className="admin-page-desc">
            Manage product categories ({categories.length} total)
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="admin-primary-btn"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
          <h3 className="admin-card-title">New Category</h3>
          <form onSubmit={handleAdd} className="admin-category-form">
            <div className="admin-field">
              <label className="admin-label">Category Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="admin-input"
                placeholder="e.g. Anklets"
                required
                autoFocus
              />
            </div>

            <div className="admin-field">
              <label className="admin-label">Category Image (optional)</label>
              <div className="admin-upload-area compact">
                {newImage ? (
                  <div className="admin-upload-preview">
                    <Image
                      src={newImage}
                      alt="Preview"
                      width={80}
                      height={80}
                      className="object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setNewImage("")}
                      className="admin-upload-remove"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="admin-upload-trigger compact">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    {uploading ? (
                      <span className="admin-spinner" />
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-white/20" />
                        <span className="text-white/30 text-xs">Upload</span>
                      </>
                    )}
                  </label>
                )}
              </div>
            </div>

            {error && <p className="admin-form-error">{error}</p>}

            <div className="admin-form-actions">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setError("");
                }}
                className="admin-secondary-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !newName.trim()}
                className="admin-primary-btn"
              >
                {saving ? <span className="admin-spinner" /> : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Grid */}
      <div className="admin-categories-grid">
        {categories.map((cat) => (
          <div key={cat.name} className="admin-category-card">
            {/* Image */}
            <div className="admin-category-image">
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              ) : (
                <Tags className="w-8 h-8 text-white/15" />
              )}
            </div>

            {/* Info */}
            <div className="admin-category-info">
              <h3 className="admin-category-name">{cat.name}</h3>
              <p className="admin-category-count">
                {productCounts[cat.name] || 0} product
                {(productCounts[cat.name] || 0) !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Delete */}
            <button
              onClick={() => handleDelete(cat.name)}
              disabled={deleting === cat.name}
              className="admin-category-delete"
              title="Delete category"
            >
              {deleting === cat.name ? (
                <span className="admin-spinner-sm" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="admin-empty-state">
            <AlertTriangle className="w-10 h-10 text-white/15 mb-3" />
            <p className="text-white/30 text-sm">No categories yet</p>
            <p className="text-white/20 text-xs">
              Add your first category to organize products
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
