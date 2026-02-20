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
  if (!slugOrId || !products || !products.length) return null;
  
  const normalizedSlug = slugify(slugOrId);
  
  // Try matching by numeric ID
  const numId = parseInt(slugOrId);
  if (!isNaN(numId)) {
    const byId = products.find(p => p.id === numId);
    if (byId) return byId;
  }
  
  // Try exact slug match
  const bySlug = products.find(p => slugify(p.name) === normalizedSlug);
  if (bySlug) return bySlug;
  
  // Try case-insensitive partial match
  const lowerInput = slugOrId.toLowerCase();
  const partialMatch = products.find(p => 
    p.name.toLowerCase().includes(lowerInput) || 
    lowerInput.includes(p.name.toLowerCase())
  );
  
  return partialMatch || null;
};
