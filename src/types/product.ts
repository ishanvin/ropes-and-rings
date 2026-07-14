export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  featured: boolean;
  created_at: string;
  /** Convenience value for the existing cards and previews. */
  imageUrl: string;
}

export interface ProductDraft {
  name: string;
  category: string;
  description: string;
  price: number;
  featured: boolean;
  images: string[];
}
