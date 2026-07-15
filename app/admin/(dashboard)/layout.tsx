"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Tags,
  LogOut,
  Gem,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/admin/verify")
      .then((res) => {
        if (!res.ok) {
          router.replace("/admin/login");
        } else {
          setAuthed(true);
        }
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  if (authed === null) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        <p>Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* Mobile Menu Toggle */}
      <button
        className="admin-mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Brand */}
        <div className="admin-sidebar-brand">
          <Gem className="w-6 h-6 text-gold" />
          <div>
            <h2 className="admin-sidebar-title">Eya Alankara</h2>
            <p className="admin-sidebar-subtitle">Admin Panel</p>
          </div>
        </div>

        {/* Divider */}
        <div className="admin-sidebar-divider" />

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`admin-nav-item ${isActive ? "active" : ""}`}
              >
                <item.icon className="w-4.5 h-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-divider" />
          <button onClick={handleLogout} className="admin-nav-item logout">
            <LogOut className="w-4.5 h-4.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
