/**
 * Cloudinary Helper Library for Eya Alankara
 * Provides utility functions for generating optimized Cloudinary delivery URLs,
 * applying jewelry-specific image transformations, and managing Cloudinary integration.
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit" | "thumb" | "scale" | "pad";
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | number;
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
  effect?: string;
  gravity?: "auto" | "center" | "face" | string;
  aspectRatio?: string;
  background?: string;
}

/**
 * Returns the configured Cloudinary Cloud Name from environment variables,
 * or falls back to "demo" for demonstration purposes.
 */
export function getCloudinaryCloudName(): string {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  }
  return "demo";
}

/**
 * Checks whether a Cloudinary cloud name has been explicitly configured
 */
export function isCloudinaryConfigured(): boolean {
  const cloudName = getCloudinaryCloudName();
  return Boolean(cloudName && cloudName !== "demo");
}

/**
 * Generates an optimized Cloudinary delivery URL for a given public ID or existing URL.
 * Automatically applies modern formatting (f_auto) and quality optimization (q_auto).
 *
 * @param publicId - The Cloudinary public ID (e.g. "samples/jewelry/necklace") or full URL
 * @param options - Transformation options (width, height, crop, effects, etc.)
 */
export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!publicId) return "";

  // If already a full HTTP/HTTPS URL that is not Cloudinary, return as is unless we want fetch delivery
  if (publicId.startsWith("http://") || publicId.startsWith("https://")) {
    if (!publicId.includes("res.cloudinary.com")) {
      return publicId;
    }
  }

  // If local static path (starts with /), return as is unless explicit Cloudinary ID is passed
  if (publicId.startsWith("/") && !publicId.startsWith("/cloudinary")) {
    return publicId;
  }

  const cloudName = getCloudinaryCloudName();

  // Build transformations array
  const transforms: string[] = [];

  // Default auto format and quality for performance
  const format = options.format || "auto";
  const quality = options.quality || "auto";

  transforms.push(`f_${format}`);
  transforms.push(`q_${quality}`);

  if (options.crop) transforms.push(`c_${options.crop}`);
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.gravity) transforms.push(`g_${options.gravity}`);
  if (options.aspectRatio) transforms.push(`ar_${options.aspectRatio}`);
  if (options.background) transforms.push(`b_${options.background}`);
  if (options.effect) transforms.push(`e_${options.effect}`);

  const transformString = transforms.join(",");

  // Clean public ID if it has leading slashes
  const cleanId = publicId.replace(/^\/+/, "");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${cleanId}`;
}

/**
 * Curated Jewelry Photography Transformation Presets
 * Designed specifically for luxury jewelry pieces (necklace sets, bangles, bridal wear)
 */
export const JEWELRY_PRESETS = {
  /** High-definition studio view with enhanced sparkle and auto contrast */
  studioHD: {
    quality: "auto:best" as const,
    format: "auto" as const,
    effect: "improve:indoor:50",
  },
  /** Bridal luxury glow - subtly warms gold tones and enhances clarity */
  bridalGlow: {
    quality: "auto:best" as const,
    format: "auto" as const,
    effect: "vibrance:30",
  },
  /** Detailed macro inspection for intricate kundan & meenakari work */
  macroDetail: {
    quality: "auto:best" as const,
    format: "auto" as const,
    effect: "sharpen:100",
  },
  /** Luxury dramatic contrast suitable for dark themes */
  luxuryContrast: {
    quality: "auto:best" as const,
    format: "auto" as const,
    effect: "contrast:20",
  },
};

/**
 * Curated sample high-resolution jewelry items from Cloudinary demo catalog
 * useful for previewing Cloudinary transformations and testing connection.
 */
export const CLOUDINARY_SAMPLE_JEWELRY = [
  {
    id: "cld-1",
    name: "Royal Polki Emerald Choker",
    publicId: "samples/ecommerce/accessories-bag", // Using reliable Cloudinary demo assets or custom IDs
    demoUrl: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/samples/ecommerce/accessories-bag",
    category: "Necklace Sets",
    price: 1499,
  },
  {
    id: "cld-2",
    name: "Maharani Kundan Bridal Set",
    publicId: "samples/ecommerce/leather-bag-gray",
    demoUrl: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/samples/ecommerce/leather-bag-gray",
    category: "Bridal Collections",
    price: 1899,
  },
];
