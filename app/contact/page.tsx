"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import AnimatedSection from "@/app/components/AnimatedSection";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", phone: "", message: "" });
    }, 3000);
  };

  const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(
    "Hello! I'm interested in your jewellery collection."
  )}`;

  return (
    <div className="pt-20 sm:pt-24 pb-24 md:pb-16 min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <AnimatedSection variant="fadeUp" className="text-center mb-12 sm:mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-dark mb-3">
            Get in Touch
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-gold mb-4">
            Contact Us
          </h1>
          <div className="gold-accent mx-auto mb-6" />
          <p className="font-body text-sm text-charcoal/60 max-w-md mx-auto">
            We&apos;d love to hear from you. Whether you have a question about our collection 
            or need a custom bridal piece, reach out to us.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ─── Contact Form ─── */}
          <AnimatedSection variant="fadeLeft">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label
                  htmlFor="name"
                  className="block text-[10px] tracking-[0.2em] uppercase text-maroon-muted/60 font-body mb-2"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-maroon/10 rounded-lg font-body text-sm text-maroon-dark placeholder:text-maroon/20 transition-all duration-300"
                  placeholder="Enter your name"
                />
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label
                  htmlFor="phone"
                  className="block text-[10px] tracking-[0.2em] uppercase text-maroon-muted/60 font-body mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-maroon/10 rounded-lg font-body text-sm text-maroon-dark placeholder:text-maroon/20 transition-all duration-300"
                  placeholder="+91 98765 43210"
                />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="message"
                  className="block text-[10px] tracking-[0.2em] uppercase text-maroon-muted/60 font-body mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-maroon/10 rounded-lg font-body text-sm text-maroon-dark placeholder:text-maroon/20 transition-all duration-300 resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  type="submit"
                  disabled={submitted}
                  className={`btn-glow w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-body font-semibold rounded-full transition-all duration-500 ${
                    submitted
                      ? "bg-green-700 text-white"
                      : "bg-maroon text-gold hover:bg-maroon-dark"
                  }`}
                >
                  {submitted ? (
                    <>
                      <span>Message Sent</span>
                      <span className="text-lg">✓</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Send Message
                    </>
                  )}
                </button>
              </motion.div>

              {/* Divider */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex-1 h-[1px] bg-maroon/10" />
                <span className="text-[10px] text-maroon/30 tracking-wider uppercase font-body">or</span>
                <div className="flex-1 h-[1px] bg-maroon/10" />
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#25D366] text-white text-xs tracking-[0.15em] uppercase font-body font-semibold rounded-full hover:bg-[#20BD5A] transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </form>
          </AnimatedSection>

          {/* ─── Contact Info + Map ─── */}
          <AnimatedSection variant="fadeRight" delay={0.2}>
            <div className="space-y-8">
              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="bg-white rounded-lg p-6 border border-maroon/5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-maroon/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm text-gold tracking-wider mb-1">Visit Us</h3>
                    <p className="font-body text-xs text-charcoal/50 leading-relaxed">
                      123, Jewellery Lane<br />
                      T. Nagar, Chennai<br />
                      Tamil Nadu 600017
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-maroon/5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-maroon/5 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm text-gold tracking-wider mb-1">Call Us</h3>
                    <p className="font-body text-xs text-charcoal/50 leading-relaxed">
                      +91 98765 43210<br />
                      Mon-Sat: 10 AM – 8 PM
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-maroon/5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-maroon/5 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm text-gold tracking-wider mb-1">Email Us</h3>
                    <p className="font-body text-xs text-charcoal/50 leading-relaxed">
                      hello@eyaalankara.com<br />
                      orders@eyaalankara.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-lg overflow-hidden border border-maroon/5">
                <div className="placeholder-image aspect-video flex items-center justify-center">
                  <div className="relative z-10 text-center">
                    <MapPin className="w-6 h-6 text-gold/50 mx-auto mb-2" />
                    <span className="text-xs">Map Placeholder</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
