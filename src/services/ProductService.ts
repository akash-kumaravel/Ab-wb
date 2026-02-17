// API service for fetching products from Hugging Face backend
import getApiBaseURL from '../config/apiConfig';

const API_BASE_URL = getApiBaseURL();

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
  features?: string[];
  created_at?: string;
  updated_at?: string;
}

class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const products = await response.json();

      // Normalize image URLs
      return products.map((product: any) => ({
        ...product,
        image: product.image.startsWith('/')
          ? `${API_BASE_URL}${product.image}`
          : product.image
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return empty array on error instead of throwing
      return [];
    }
  }

  static async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const product = await response.json();

      if (product && product.image && product.image.startsWith('/')) {
        product.image = `${API_BASE_URL}${product.image}`;
      }

      return product;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
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
