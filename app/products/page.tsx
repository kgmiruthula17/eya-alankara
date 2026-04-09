"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/app/components/ProductCard";
import AnimatedSection from "@/app/components/AnimatedSection";
import { products, categories, occasions } from "@/app/data/products";

type Category = (typeof categories)[number];
type Occasion = (typeof occasions)[number];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catMatch = selectedCategory === "All" || p.category === selectedCategory;
      const occMatch = selectedOccasion === "All" || p.occasion === selectedOccasion;
      return catMatch && occMatch;
    });
  }, [selectedCategory, selectedOccasion]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedOccasion("All");
  };

  const hasFilters = selectedCategory !== "All" || selectedOccasion !== "All";

  return (
    <div className="pt-20 sm:pt-24 pb-24 md:pb-16 min-h-screen bg-cream">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fadeUp" className="text-center mb-10 sm:mb-14">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-dark mb-3">
            Discover
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-gold mb-4">
            Our Collection
          </h1>
          <div className="gold-accent mx-auto" />
        </AnimatedSection>

        {/* ─── Filter Bar ─── */}
        <div className="mb-8 sm:mb-12">
          {/* Category Tabs (Desktop) */}
          <div className="hidden sm:flex items-center justify-center gap-2 flex-wrap mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs tracking-[0.12em] uppercase font-body font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-maroon text-gold"
                    : "bg-white text-maroon/60 hover:text-maroon hover:bg-warm-gray border border-maroon/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Occasion Tags (Desktop) */}
          <div className="hidden sm:flex items-center justify-center gap-2 mb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-maroon-muted/50 font-body mr-2">
              Occasion:
            </span>
            {occasions.map((occ) => (
              <button
                key={occ}
                onClick={() => setSelectedOccasion(occ)}
                className={`px-4 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase font-body transition-all duration-300 ${
                  selectedOccasion === occ
                    ? "bg-gold/20 text-gold-dark border border-gold/30"
                    : "text-maroon/40 hover:text-maroon/60 border border-transparent"
                }`}
              >
                {occ}
              </button>
            ))}
          </div>

          {/* Mobile Filter Toggle */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-maroon/10 text-xs tracking-[0.12em] uppercase font-body text-maroon/60"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters {hasFilters && `(${filtered.length})`}
              </span>
              <motion.span
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▾
              </motion.span>
            </button>

            {/* Mobile Filter Drawer */}
            <motion.div
              initial={false}
              animate={{ height: showFilters ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                {/* Category */}
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-maroon-muted/50 font-body mb-2">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase font-body transition-all duration-300 ${
                          selectedCategory === cat
                            ? "bg-maroon text-gold"
                            : "bg-white text-maroon/50 border border-maroon/10"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Occasion */}
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-maroon-muted/50 font-body mb-2">Occasion</p>
                  <div className="flex flex-wrap gap-2">
                    {occasions.map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setSelectedOccasion(occ)}
                        className={`px-3 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase font-body transition-all duration-300 ${
                          selectedOccasion === occ
                            ? "bg-gold/20 text-gold-dark border border-gold/30"
                            : "text-maroon/40 border border-maroon/10"
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Active Filter Clear */}
          {hasFilters && (
            <div className="flex justify-center mt-4">
              <button
                onClick={clearFilters}
                className="text-[10px] tracking-[0.15em] uppercase font-body text-maroon-muted/50 hover:text-gold-dark transition-colors underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* ─── Product Grid ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-heading text-xl text-maroon/40 mb-2">No pieces found</p>
            <p className="font-body text-sm text-maroon/30">
              Try adjusting your filters to discover more.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 px-6 py-2 text-xs tracking-[0.15em] uppercase font-body bg-maroon text-gold rounded-full hover:bg-maroon-dark transition-all duration-300"
            >
              View All
            </button>
          </div>
        )}

        {/* Results Count */}
        {filtered.length > 0 && (
          <p className="text-center mt-10 font-body text-xs text-maroon-muted/40 tracking-wider">
            Showing {filtered.length} of {products.length} pieces
          </p>
        )}
      </div>
    </div>
  );
}
