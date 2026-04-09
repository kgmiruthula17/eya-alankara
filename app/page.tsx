"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/app/components/AnimatedSection";
import { categoryImages } from "@/app/data/products";

/* ─── Hero Carousel Data ─── */
const heroSlides = [
  {
    image: "/necksets/2.png",
    label: "Bridal Jewellery",
  },
  {
    image: "/bangles/1.png",
    label: "Gold Textures",
  },
  {
    image: "/necksets/1.png",
    label: "Model Shots",
  },
];

/* ─── Collection Categories ─── */
const collections = [
  { name: "Necklace Sets", description: "Timeless elegance for every bride" },
  { name: "Bangles", description: "Circles of tradition and grace" },
  { name: "Earrings", description: "Adornments that frame your beauty" },
  { name: "Bridal Collections", description: "Complete ensembles for your day" },
];

/* ─── Testimonials ─── */
const testimonials = [
  {
    quote: "The craftsmanship is extraordinary. My bridal set from Eya Alankara made me feel like royalty on my wedding day.",
    name: "Priya Sharma",
    location: "Mumbai",
  },
  {
    quote: "Every piece tells a story. The attention to detail and use of traditional techniques sets them apart.",
    name: "Ananya Reddy",
    location: "Hyderabad",
  },
  {
    quote: "I found my grandmother's elegance reimagined in their modern temple jewellery. Absolutely stunning.",
    name: "Deepika Nair",
    location: "Chennai",
  },
];

export default function HomePage() {
  /* ─── Hero Carousel State ─── */
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  /* ─── Testimonial Carousel State ─── */
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
        {/* Background Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-maroon-dark"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt="Hero Background"
              fill
              priority
              className="object-cover opacity-70"
            />
            {/* Placeholder label */}
            <div className="absolute bottom-8 right-8 text-cream/10 font-heading text-xs tracking-[0.3em] uppercase">
              {heroSlides[currentSlide].label}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Light Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30 z-10" />

        {/* Silk Texture */}
        <div className="absolute inset-0 z-10 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 1px, rgba(212,175,55,0.03) 1px, rgba(212,175,55,0.03) 2px)`,
          }} />
        </div>

        {/* Center Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[1px] bg-gold/60 mb-8"
          />

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.15em] text-cream mb-4"
          >
            Eya Alankara
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-body text-sm sm:text-base tracking-[0.3em] uppercase text-gold/80 mb-10"
          >
            Luxury in Details
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/products"
              className="btn-glow group px-8 py-3.5 border border-gold/40 text-gold text-xs tracking-[0.2em] uppercase font-body font-medium rounded-full hover:bg-gold hover:text-maroon-dark transition-all duration-500 flex items-center gap-2"
            >
              Explore Collection
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/products"
              className="btn-glow px-8 py-3.5 bg-gold text-maroon-dark text-xs tracking-[0.2em] uppercase font-body font-semibold rounded-full hover:bg-gold-light transition-all duration-500"
            >
              Shop Now
            </Link>
          </motion.div>

          {/* Slide Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3"
          >
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-8 h-[2px] rounded-full transition-all duration-500 ${
                  i === currentSlide ? "bg-gold w-12" : "bg-cream/30 hover:bg-cream/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURED COLLECTIONS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-cream silk-overlay">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <AnimatedSection variant="fadeUp" className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-dark mb-3">
              Curated for You
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-gold mb-4">
              Our Collections
            </h2>
            <div className="gold-accent mx-auto" />
          </AnimatedSection>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {collections.map((col, i) => (
              <AnimatedSection key={col.name} variant="fadeUp" delay={i * 0.1}>
                <Link href="/products" className="group block">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    {/* Image */}
                    <div className="w-full h-full transition-transform duration-700 group-hover:scale-110 bg-warm-gray">
                      <Image
                        src={categoryImages[col.name] || "/necksets/1.png"}
                        alt={col.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>

                    {/* Gold Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gold/30 via-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Bottom Label */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-16">
                      <h3 className="font-heading text-sm sm:text-base text-white tracking-wider group-hover:text-gold transition-colors duration-300 drop-shadow-lg">
                        {col.name}
                      </h3>
                      <p className="font-body text-[10px] sm:text-xs text-cream/60 mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 drop-shadow-md">
                        {col.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-warm-gray">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <AnimatedSection variant="fadeLeft">
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-warm-gray">
                  <Image
                    src="/earrings/2.png"
                    alt="Craftsmanship Detail"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Decorative Border */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 rounded-lg -z-10" />
              </div>
            </AnimatedSection>

            {/* Text */}
            <AnimatedSection variant="fadeRight" delay={0.2}>
              <div>
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-dark mb-3">
                  Our Heritage
                </p>
                <h2 className="font-heading text-3xl sm:text-4xl text-gold mb-6 leading-snug">
                  Craftsmanship Woven
                  <br />
                  Into Every Detail
                </h2>
                <div className="gold-accent mb-8" />
                <div className="space-y-4 text-sm sm:text-base text-charcoal/70 font-body leading-relaxed">
                  <p>
                    At Eya Alankara, we believe jewellery is more than adornment — it is an heirloom 
                    of emotion, tradition, and artistry. Our master artisans carry forward centuries 
                    of Indian jewellery-making heritage, blending ancient techniques with 
                    contemporary design sensibilities.
                  </p>
                  <p>
                    Each piece is meticulously handcrafted using ethically sourced materials, 
                    from the finest kundan and polki to temple-inspired gold work. We create not 
                    just jewellery, but legacies that pass from one generation to the next.
                  </p>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 mt-8 text-xs tracking-[0.2em] uppercase font-body font-medium text-gold-dark hover:text-gold transition-colors duration-300 group"
                >
                  Discover More
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-maroon-dark silk-overlay">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <AnimatedSection variant="fadeUp">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/60 mb-3">
              Testimonials
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white mb-16">
              Words of Love
            </h2>
          </AnimatedSection>

          {/* Carousel */}
          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Quotation Mark */}
                <div className="font-heading text-6xl text-gold/30 mb-4 leading-none">&ldquo;</div>

                <p className="font-body text-base sm:text-lg text-cream/80 leading-relaxed max-w-2xl mx-auto mb-8 italic">
                  {testimonials[currentTestimonial].quote}
                </p>

                <div className="flex items-center justify-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-gold fill-gold" />
                  ))}
                </div>

                <p className="font-heading text-sm tracking-[0.15em] text-gold mt-4">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="font-body text-xs text-cream/40 mt-1">
                  {testimonials[currentTestimonial].location}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-cream/20 hover:text-gold transition-colors hidden sm:block"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-cream/20 hover:text-gold transition-colors hidden sm:block"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-400 ${
                  i === currentTestimonial ? "bg-gold w-6" : "bg-cream/20 hover:bg-cream/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream">
        <AnimatedSection variant="scaleIn" className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-gold mb-4 leading-snug">
            Begin Your Bridal Journey
          </h2>
          <p className="font-body text-sm text-charcoal/60 mb-8 max-w-xl mx-auto">
            Explore our handcrafted collections and find the perfect pieces
            to make your special day truly unforgettable.
          </p>
          <Link
            href="/products"
            className="btn-glow inline-flex items-center gap-2 px-10 py-4 bg-maroon text-gold text-xs tracking-[0.2em] uppercase font-body font-semibold rounded-full hover:bg-maroon-dark transition-all duration-500"
          >
            View All Collections
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
