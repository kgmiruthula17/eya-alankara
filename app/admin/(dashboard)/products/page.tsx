"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Search,
  Package,
} from "lucide-react";
import { formatPrice } from "@/app/data/products";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  occasion: string;
  description: string;
  image: string;
}

interface Category {
  name: string;
  image?: string;
}

const OCCASIONS = ["Bridal", "Festive", "Everyday"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    occasion: "Bridal",
    description: "",
    image: "",
  });

  const fetchData = useCallback(() => {
    setLoading(true);
    Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
    ])
      .then(([pData, cData]) => {
        setProducts(pData.products || []);
        setCategories(cData.categories || []);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      price: "",
      category: categories[0]?.name || "",
      occasion: "Bridal",
      description: "",
      image: "",
    });
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      occasion: product.occasion,
      description: product.description,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "eya_alankara/products");

      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({ ...prev, image: data.url }));
      } else {
        alert("Failed to upload image. Please try again.");
      }
    } catch {
      alert("Upload error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingProduct) {
        // Update
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            price: Number(form.price),
            category: form.category,
            occasion: form.occasion,
            description: form.description,
            image: form.image,
          }),
        });
        if (!res.ok) throw new Error("Update failed");
      } else {
        // Create
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            price: Number(form.price),
            category: form.category,
            occasion: form.occasion,
            description: form.description,
            image: form.image || "/necksets/1.png",
          }),
        });
        if (!res.ok) throw new Error("Create failed");
      }

      setShowModal(false);
      fetchData();
    } catch {
      alert("Failed to save product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to delete product.");
      }
    } catch {
      alert("Delete error.");
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
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-desc">
            Manage your jewellery catalogue ({products.length} items)
          </p>
        </div>
        <button onClick={openAdd} className="admin-primary-btn">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="admin-search-bar">
        <Search className="w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-search-input"
        />
      </div>

      {/* Products Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Occasion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="admin-product-cell">
                    <div className="admin-product-thumb">
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={48}
                        height={48}
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <span className="admin-product-name">{p.name}</span>
                      <span className="admin-product-id">#{p.id}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="admin-badge">{p.category}</span>
                </td>
                <td className="admin-price">{formatPrice(p.price)}</td>
                <td>
                  <span className="admin-badge occasion">{p.occasion}</span>
                </td>
                <td>
                  <div className="admin-actions">
                    <button
                      onClick={() => openEdit(p)}
                      className="admin-action-btn edit"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="admin-action-btn delete"
                      disabled={deleting === p.id}
                      title="Delete"
                    >
                      {deleting === p.id ? (
                        <span className="admin-spinner-sm" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="admin-empty">
                  <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  {search ? "No products match your search" : "No products yet"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="admin-modal-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="admin-modal-body">
              {/* Name */}
              <div className="admin-field">
                <label className="admin-label">Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="admin-input"
                  placeholder="e.g. Kundan Bridal Necklace Set"
                  required
                />
              </div>

              {/* Price + Category */}
              <div className="admin-field-row">
                <div className="admin-field">
                  <label className="admin-label">Price (₹)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                    className="admin-input"
                    placeholder="999"
                    min="1"
                    required
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    className="admin-select"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Occasion */}
              <div className="admin-field">
                <label className="admin-label">Occasion</label>
                <div className="admin-radio-group">
                  {OCCASIONS.map((occ) => (
                    <label key={occ} className="admin-radio-label">
                      <input
                        type="radio"
                        name="occasion"
                        value={occ}
                        checked={form.occasion === occ}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, occasion: e.target.value }))
                        }
                        className="admin-radio"
                      />
                      {occ}
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="admin-field">
                <label className="admin-label">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="admin-textarea"
                  placeholder="Describe the jewellery piece..."
                  rows={3}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="admin-field">
                <label className="admin-label">Product Image</label>
                <div className="admin-upload-area">
                  {form.image ? (
                    <div className="admin-upload-preview">
                      <Image
                        src={form.image}
                        alt="Preview"
                        width={120}
                        height={120}
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, image: "" }))}
                        className="admin-upload-remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="admin-upload-trigger">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      {uploading ? (
                        <div className="admin-upload-loading">
                          <span className="admin-spinner" />
                          <span>Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-white/20" />
                          <span className="text-white/40 text-xs mt-2">
                            Click to upload image
                          </span>
                          <span className="text-white/20 text-[10px] mt-1">
                            Uploaded via Cloudinary
                          </span>
                        </>
                      )}
                    </label>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="admin-secondary-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-primary-btn"
                >
                  {saving ? (
                    <span className="admin-spinner" />
                  ) : editingProduct ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
