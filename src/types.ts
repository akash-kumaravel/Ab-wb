
export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category?: number;
  outOfStock?: boolean;
  discount?: string;
  specialOfferPrice?: string;
  isSpecialOffer?: boolean;
  countdown?: boolean;
  description?: string;
  features?: string[];
  warranty?: string;
  shipping?: string;
  categoryName?: string;
  model?: string;
  series?: string;
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
