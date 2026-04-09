import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Collections" },
  { href: "/cart", label: "Cart" },
  { href: "/contact", label: "Contact" },
];

const instagramImages = [
  "/necksets/2.png",
  "/bangles/1.png",
  "/earrings/2.png",
  "/necksets/4.png",
  "/bangles/2.png",
  "/earrings/1.png",
];

export default function Footer() {
  return (
    <footer className="bg-maroon-dark text-cream/70 silk-overlay pb-20 md:pb-0">
      <div className="relative z-10">
        {/* Gold Top Line */}
        <div className="gold-divider" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <AnimatedSection variant="fadeUp" delay={0}>
              <div>
                <h3 className="font-heading text-xl tracking-[0.2em] text-white mb-4">
                  EYA ALANKARA
                </h3>
                <p className="text-sm leading-relaxed text-cream/50 mb-6">
                  Crafting timeless bridal jewellery that celebrates the beauty of Indian traditions. 
                  Each piece tells a story of heritage and elegance.
                </p>
                <div className="gold-accent" />
              </div>
            </AnimatedSection>

            {/* Quick Links */}
            <AnimatedSection variant="fadeUp" delay={0.1}>
              <div>
                <h4 className="font-heading text-sm tracking-[0.2em] uppercase text-white mb-6">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/50 hover:text-gold transition-colors duration-300 tracking-wide"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Instagram Grid */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
              <div>
                <h4 className="font-heading text-sm tracking-[0.2em] uppercase text-white mb-6">
                  Instagram
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {instagramImages.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-sm overflow-hidden hover:opacity-80 transition-opacity duration-300 cursor-pointer bg-warm-gray"
                    >
                      <Image
                        src={src}
                        alt={`Instagram image ${i + 1}`}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Contact */}
            <AnimatedSection variant="fadeUp" delay={0.3}>
              <div>
                <h4 className="font-heading text-sm tracking-[0.2em] uppercase text-white mb-6">
                  Contact
                </h4>
                <div className="space-y-3 text-sm text-cream/50">
                  <p>123, Jewellery Lane</p>
                  <p>Chennai, Tamil Nadu 600001</p>
                  <p className="pt-2">+91 98765 43210</p>
                  <p>hello@eyaalankara.com</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-cream/30 tracking-wider">
              © 2026 Eya Alankara. All rights reserved.
            </p>
            <p className="text-xs text-cream/30 tracking-wider flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-gold/50 fill-gold/50" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
