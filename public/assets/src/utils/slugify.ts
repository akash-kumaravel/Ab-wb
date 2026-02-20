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
  if (!slugOrId || !products || !products.length) {
    console.log('findProductBySlug: Invalid input', { slugOrId, productsLength: products?.length });
    return null;
  }
  
  console.log('findProductBySlug searching for:', slugOrId);
  console.log('Available products:', products.map(p => ({ id: p.id, name: p.name, slug: slugify(p.name) })));
  
  // First, try matching by numeric ID (backwards compatibility)
  const numId = parseInt(slugOrId);
  if (!isNaN(numId)) {
    console.log('Trying numeric ID match:', numId);
    const byId = products.find(p => p.id === numId);
    if (byId) {
      console.log('Found by ID:', byId);
      return byId;
    }
  }
  
  // Then try matching by slug
  const normalizedSlug = slugify(slugOrId);
  console.log('Normalized slug:', normalizedSlug);
  
  const bySlug = products.find(p => {
    const productSlug = slugify(p.name);
    console.log('Comparing:', productSlug, '===', normalizedSlug, '?', productSlug === normalizedSlug);
    return productSlug === normalizedSlug;
  });
  
  if (bySlug) {
    console.log('Found by slug:', bySlug);
    return bySlug;
  }
  
  // Finally, try case-insensitive partial match (more lenient)
  const lowerInput = slugOrId.toLowerCase();
  const partialMatch = products.find(p => 
    p.name.toLowerCase().includes(lowerInput) || 
    lowerInput.includes(p.name.toLowerCase())
  );
  
  if (partialMatch) {
    console.log('Found by partial match:', partialMatch);
    return partialMatch;
  }
  
  console.log('No match found for slug:', slugOrId);
  return null;
};
