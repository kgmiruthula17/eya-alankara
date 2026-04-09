"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/app/data/products";
import { formatPrice } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:shadow-maroon/5 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-warm-gray">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/80 via-maroon-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            disabled={added}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs tracking-[0.15em] uppercase font-body font-medium transition-all duration-300 ${
              added
                ? "bg-green-700 text-white"
                : "bg-gold text-maroon-dark hover:bg-gold-light"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" strokeWidth={2} />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
                Add to Cart
              </>
            )}
          </motion.button>
        </div>

        {/* Gold Border Accent on hover */}
        <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/30 rounded-lg transition-all duration-500 pointer-events-none" />
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-maroon-muted/60 font-body mb-1">
          {product.category}
        </p>
        <h3 className="font-heading text-sm sm:text-base text-gold leading-snug mb-2 group-hover:text-maroon transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <p className="font-body text-sm text-gold-dark font-semibold tracking-wide">
            {formatPrice(product.price)}
          </p>
          {/* Mobile Add to Cart — always visible on small screens, hidden on desktop (hover overlay used instead) */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            disabled={added}
            className={`sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase font-body font-medium transition-all duration-300 ${
              added
                ? "bg-green-700 text-white"
                : "bg-maroon text-gold hover:bg-maroon-dark"
            }`}
          >
            {added ? (
              <Check className="w-3 h-3" strokeWidth={2} />
            ) : (
              <ShoppingBag className="w-3 h-3" strokeWidth={2} />
            )}
            {added ? "Added" : "Add"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
