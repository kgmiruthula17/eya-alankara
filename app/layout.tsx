import type { Metadata } from "next";
import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";
import LayoutShell from "@/app/components/LayoutShell";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Eya Alankara | Luxury Bridal Jewellery",
  description:
    "Discover exquisite handcrafted bridal and traditional jewellery at Eya Alankara. From kundan necklace sets to temple gold bangles, find timeless pieces for your special day.",
  keywords: ["bridal jewellery", "Indian jewellery", "gold necklace", "kundan", "traditional jewellery", "wedding jewellery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <LayoutShell>{children}</LayoutShell>
        </CartProvider>
      </body>
    </html>
  );
}

