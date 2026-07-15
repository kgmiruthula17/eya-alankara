"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, Tags, TrendingUp, Plus, ArrowRight } from "lucide-react";
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

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="admin-page-loading">
        <div className="admin-loading-spinner" />
      </div>
    );
  }

  const recentProducts = products.slice(-5).reverse();

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-desc">Welcome back to Eya Alankara admin</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: "rgba(212,175,55,0.15)" }}>
            <Package className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="admin-stat-label">Total Products</p>
            <p className="admin-stat-value">{products.length}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: "rgba(139,58,58,0.2)" }}>
            <Tags className="w-5 h-5 text-maroon-muted" />
          </div>
          <div>
            <p className="admin-stat-label">Categories</p>
            <p className="admin-stat-value">{categories.length}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: "rgba(34,197,94,0.12)" }}>
            <TrendingUp className="w-5 h-5" style={{ color: "#22c55e" }} />
          </div>
          <div>
            <p className="admin-stat-label">Avg. Price</p>
            <p className="admin-stat-value">
              {products.length > 0
                ? formatPrice(
                    Math.round(
                      products.reduce((s, p) => s + p.price, 0) / products.length
                    )
                  )
                : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-section">
        <h2 className="admin-section-title">Quick Actions</h2>
        <div className="admin-quick-actions">
          <Link href="/admin/products" className="admin-action-card">
            <Plus className="w-5 h-5 text-gold" />
            <span>Add New Product</span>
          </Link>
          <Link href="/admin/categories" className="admin-action-card">
            <Tags className="w-5 h-5 text-gold" />
            <span>Manage Categories</span>
          </Link>
        </div>
      </div>

      {/* Recent Products */}
      <div className="admin-section">
        <div className="admin-section-header">
          <h2 className="admin-section-title">Recent Products</h2>
          <Link href="/admin/products" className="admin-section-link">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Occasion</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="admin-product-cell">
                      <div className="admin-product-thumb">
                        <Image
                          src={p.image}
                          alt={p.name}
                          width={40}
                          height={40}
                          className="object-cover rounded"
                        />
                      </div>
                      <span className="admin-product-name">{p.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="admin-badge">{p.category}</span>
                  </td>
                  <td className="admin-price">{formatPrice(p.price)}</td>
                  <td>
                    <span className="admin-badge occasion">{p.occasion}</span>
                  </td>
                </tr>
              ))}
              {recentProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="admin-empty">
                    No products yet. Add your first product!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
