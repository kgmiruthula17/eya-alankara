"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import MobileNav from "@/app/components/MobileNav";
import Footer from "@/app/components/Footer";

/**
 * Wraps the public Navbar, Footer, and MobileNav.
 * Hides them on /admin routes so the admin panel gets its own chrome.
 */
export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileNav />
    </>
  );
}
