"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { formatPrice } from "@/app/data/products";
import AnimatedSection from "@/app/components/AnimatedSection";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  return (
    <div className="pt-20 sm:pt-24 pb-24 md:pb-16 min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <AnimatedSection variant="fadeUp" className="text-center mb-10 sm:mb-14">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-dark mb-3">
            Your Selection
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-gold mb-4">
            Shopping Cart
          </h1>
          <div className="gold-accent mx-auto" />
        </AnimatedSection>

        {items.length === 0 ? (
          /* ─── Empty Cart ─── */
          <AnimatedSection variant="scaleIn" className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-maroon/5 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-maroon/30" strokeWidth={1.5} />
            </div>
            <h2 className="font-heading text-xl text-gold mb-2">Your cart is empty</h2>
            <p className="font-body text-sm text-maroon/30 mb-8">
              Discover our exquisite collection and find your perfect piece.
            </p>
            <Link
              href="/products"
              className="btn-glow inline-flex items-center gap-2 px-8 py-3 bg-maroon text-gold text-xs tracking-[0.2em] uppercase font-body font-semibold rounded-full hover:bg-maroon-dark transition-all duration-500"
            >
              Continue Shopping
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ─── Cart Items ─── */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-lg p-4 sm:p-5 flex gap-4 shadow-sm"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-md flex-shrink-0 overflow-hidden bg-warm-gray">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="(max-width: 640px) 5rem, 6rem"
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-maroon-muted/50 font-body">
                          {item.product.category}
                        </p>
                        <h3 className="font-heading text-sm sm:text-base text-gold leading-snug mt-0.5 truncate">
                          {item.product.name}
                        </h3>
                        <p className="font-body text-sm text-gold-dark font-semibold mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-cream rounded-full px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="text-maroon/40 hover:text-maroon transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-body text-sm text-maroon-dark font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="text-maroon/40 hover:text-maroon transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-maroon/20 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Line Total (Desktop) */}
                    <div className="hidden sm:flex flex-col items-end justify-center">
                      <p className="font-body text-sm text-gold-dark font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="font-body text-[10px] text-maroon/30 mt-0.5">
                          {formatPrice(item.product.price)} each
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Clear Cart */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={clearCart}
                  className="text-[10px] tracking-[0.15em] uppercase font-body text-maroon/30 hover:text-red-600 transition-colors underline underline-offset-4"
                >
                  Clear cart
                </button>
              </div>
            </div>

            {/* ─── Order Summary ─── */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-sm sticky top-24"
              >
                <h3 className="font-heading text-lg text-gold mb-6 tracking-wider">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-maroon/50">Subtotal ({items.length} {items.length === 1 ? "item" : "items"})</span>
                    <span className="text-maroon-dark">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-maroon/50">Shipping</span>
                    <span className="text-green-700 text-xs tracking-wider">COMPLIMENTARY</span>
                  </div>
                </div>

                <div className="gold-divider mb-6" />

                <div className="flex justify-between items-center mb-8">
                  <span className="font-heading text-sm tracking-wider text-gold">Total</span>
                  <span className="font-heading text-xl text-gold-dark">{formatPrice(totalPrice)}</span>
                </div>

                <button className="btn-glow w-full py-3.5 bg-maroon text-gold text-xs tracking-[0.2em] uppercase font-body font-semibold rounded-full hover:bg-maroon-dark transition-all duration-500">
                  Proceed to Checkout
                </button>

                <Link
                  href="/products"
                  className="block text-center mt-4 text-[10px] tracking-[0.15em] uppercase font-body text-maroon/40 hover:text-gold-dark transition-colors"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
