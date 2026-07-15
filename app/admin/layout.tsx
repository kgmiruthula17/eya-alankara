import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Eya Alankara",
  description: "Admin panel for Eya Alankara jewellery store",
  robots: "noindex, nofollow",
};

/**
 * Admin layout — intentionally excludes the public Navbar, Footer, and MobileNav.
 * Only provides the CartProvider-free wrapper with font variables already set by the root layout.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
