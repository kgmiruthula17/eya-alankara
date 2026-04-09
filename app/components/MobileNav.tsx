"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, ShoppingBag, Phone } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Shop", icon: Store },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
  { href: "/contact", label: "Contact", icon: Phone },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-gold/10">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors duration-300 ${
                active ? "text-gold" : "text-cream/50 hover:text-cream/80"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                {item.label === "Cart" && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-gold text-maroon-dark text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-wider uppercase font-body">
                {item.label}
              </span>
              {active && (
                <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gold rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
