/**
 * Convert product name to URL-friendly slug
 * Example: "Ring Spinning Frame RS-8000" → "ring-spinning-frame-rs-8000"
 */
export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]/g, '') // Remove special chars except hyphens and word chars
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Find a product by slug, also supports numeric IDs for backwards compatibility
 */
export const findProductBySlug = (slugOrId: string, products: any[]): any | null => {
  if (!slugOrId || !products.length) return null;
  
  // First, try matching by numeric ID (backwards compatibility)
  const numId = parseInt(slugOrId);
  if (!isNaN(numId)) {
    const byId = products.find(p => p.id === numId);
    if (byId) return byId;
  }
  
  // Then try matching by slug
  const normalizedSlug = slugify(slugOrId);
  return products.find(p => slugify(p.name) === normalizedSlug) || null;
};
