"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Collections" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg shadow-maroon-dark/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <h1 className={`font-heading text-lg sm:text-xl tracking-[0.2em] transition-colors duration-300 ${
                scrolled
                  ? "text-white group-hover:text-gold-light"
                  : "text-maroon-dark group-hover:text-gold"
              }`}>
                EYA ALANKARA
              </h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-body text-sm tracking-[0.12em] uppercase transition-colors duration-300 group ${
                    scrolled
                      ? "text-cream/80 hover:text-gold"
                      : "text-maroon/70 hover:text-maroon-dark"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
                </Link>
              ))}

              {/* Cart Icon */}
              <Link href="/cart" className="relative group ml-2">
                <ShoppingBag
                  className={`w-5 h-5 transition-colors duration-300 ${
                    scrolled ? "text-cream/80 group-hover:text-gold" : "text-maroon/70 group-hover:text-maroon-dark"
                  }`}
                  strokeWidth={1.5}
                />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-maroon-dark text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
            </nav>

            {/* Mobile: Cart + Hamburger */}
            <div className="flex items-center gap-4 md:hidden">
              <Link href="/cart" className="relative group">
                <ShoppingBag
                  className={`w-5 h-5 transition-colors duration-300 ${
                    scrolled ? "text-cream/80 group-hover:text-gold" : "text-maroon/70 group-hover:text-maroon-dark"
                  }`}
                  strokeWidth={1.5}
                />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-maroon-dark text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className={`transition-colors ${
                  scrolled ? "text-cream/80 hover:text-gold" : "text-maroon/70 hover:text-maroon-dark"
                }`}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-maroon-dark z-[70] md:hidden silk-overlay"
            >
              <div className="relative z-10 flex flex-col h-full p-6">
                {/* Close Button */}
                <div className="flex justify-end mb-12">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="text-cream/60 hover:text-gold transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Links */}
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="font-heading text-lg tracking-[0.15em] text-cream/80 hover:text-gold transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom Gold Line */}
                <div className="mt-auto">
                  <div className="gold-divider mb-6" />
                  <p className="font-body text-xs text-cream/40 tracking-widest uppercase">
                    Luxury in Details
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
