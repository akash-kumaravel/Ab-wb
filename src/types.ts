
export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  outOfStock?: boolean;
  discount?: string;
  countdown?: boolean;
  description?: string;
  features?: string[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  subCategories: string[];
}

export interface TrustBadge {
  id: number;
  title: string;
  description: string;
  icon: string;
}
