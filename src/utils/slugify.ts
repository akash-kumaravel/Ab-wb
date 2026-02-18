/**
 * Convert product name to URL-friendly slug
 * Example: "Ring Spinning Frame RS-8000" → "ring-spinning-frame-rs-8000"
 */
export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove special characters except hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
};

/**
 * Find a product by slug (matches against product name)
 */
export const findProductBySlug = (slug: string, products: any[]): any | null => {
  return products.find(p => slugify(p.name) === slug) || null;
};
