// Product data is sourced from the repository-backed products.json file so
// Vercel can rebuild the frontend after GitHub updates without relying on a
// live backend fetch for the storefront display.
import productsData from '../../products.json';
import getApiBaseURL from '../config/apiConfig';

const PRODUCTS: Product[] = productsData as Product[];

const normalizeProductImage = (product: Product): Product => ({
  ...product,
  image: (() => {
    const image = product.image || '';

    if (!image) return '';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    if (image.startsWith('/')) return image;
    return image;
  })()
});

const normalizeProducts = (products: Product[]): Product[] =>
  products.map((product) => normalizeProductImage(product));

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category?: number;
  description?: string;
  features?: string[];
  model?: string;
  series?: string;
  warranty?: string;
  shipping?: string;
  categoryName?: string;
  outOfStock?: boolean;
  discount?: string;
  specialOfferPrice?: string;
  isSpecialOffer?: boolean;
  created_at?: string;
  updated_at?: string;
}

class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${getApiBaseURL()}/api/products`, {
        cache: 'no-store',
      });

      if (response.ok) {
        const products = await response.json();
        if (Array.isArray(products)) {
          return normalizeProducts(products as Product[]);
        }
      }
    } catch (error) {
      console.error('Error fetching products from server:', error);
    }

    return normalizeProducts(PRODUCTS);
  }

  static async getProductById(id: number): Promise<Product | null> {
    const products = await ProductService.getAllProducts();
    const product = products.find((item) => item.id === id);
    return product ? normalizeProductImage(product) : null;
  }

  static async searchProducts(query: string, products: Product[]): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description?.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export default ProductService;
