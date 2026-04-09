export interface Product {
  id: string;
  name: string;
  price: number;
  category: "Necklace Sets" | "Bangles" | "Earrings" | "Bridal Collections";
  occasion: "Bridal" | "Festive" | "Everyday";
  description: string;
  image: string;
}

export const products: Product[] = [
  // ─── Necklace Sets ───
  {
    id: "1",
    name: "Kundan Bridal Necklace Set",
    price: 999,
    category: "Necklace Sets",
    occasion: "Bridal",
    description: "Exquisite kundan necklace with matching earrings, handcrafted for the modern bride.",
    image: "/necksets/1.png",
  },
  {
    id: "2",
    name: "Temple Gold Choker",
    price: 899,
    category: "Necklace Sets",
    occasion: "Festive",
    description: "Traditional temple-inspired gold choker with intricate deity motifs.",
    image: "/necksets/2.png",
  },
  {
    id: "3",
    name: "Polki Diamond Haar",
    price: 1299,
    category: "Necklace Sets",
    occasion: "Bridal",
    description: "Stunning polki diamond long haar with emerald accents for the regal bride.",
    image: "/necksets/3.png",
  },
  {
    id: "4",
    name: "Lakshmi Coin Necklace",
    price: 699,
    category: "Necklace Sets",
    occasion: "Festive",
    description: "Iconic Lakshmi coin necklace in pure gold finish with matching studs.",
    image: "/necksets/4.png",
  },

  // ─── Bangles ───
  {
    id: "5",
    name: "Antique Gold Bangles Set",
    price: 599,
    category: "Bangles",
    occasion: "Festive",
    description: "Set of 6 antique finish gold bangles with traditional meenakari work.",
    image: "/bangles/1.png",
  },
  {
    id: "6",
    name: "Bridal Kada Collection",
    price: 799,
    category: "Bangles",
    occasion: "Bridal",
    description: "Heavy bridal kadas with kundan stones and pearl droplets.",
    image: "/bangles/2.png",
  },

  // ─── Earrings ───
  {
    id: "7",
    name: "Chandbali Pearl Earrings",
    price: 399,
    category: "Earrings",
    occasion: "Festive",
    description: "Crescent-shaped chandbali earrings adorned with freshwater pearls.",
    image: "/earrings/1.png",
  },
  {
    id: "8",
    name: "Jhumka Heritage Drops",
    price: 499,
    category: "Earrings",
    occasion: "Bridal",
    description: "Classic jhumka earrings with gold beads and traditional bell design.",
    image: "/earrings/2.png",
  },
  {
    id: "9",
    name: "Ruby Stud Earrings",
    price: 299,
    category: "Earrings",
    occasion: "Everyday",
    description: "Elegant ruby-studded gold earrings for refined daily wear.",
    image: "/earrings/3.png",
  },
];

export const categories = ["All", "Necklace Sets", "Bangles", "Earrings", "Bridal Collections"] as const;
export const occasions = ["All", "Bridal", "Festive", "Everyday"] as const;

// Category images for the home page featured grid
export const categoryImages: Record<string, string> = {
  "Necklace Sets": "/necksets/1.png",
  "Bangles": "/bangles/1.png",
  "Earrings": "/earrings/1.png",
  "Bridal Collections": "/necksets/3.png",
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
