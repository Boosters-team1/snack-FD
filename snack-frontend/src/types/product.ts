export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl?: string;
  purchaseCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateRequest {
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl?: string;
}

export interface ProductUpdateRequest {
  name?: string;
  price?: number;
  category?: string;
  description?: string;
  imageUrl?: string;
}

export type SortOption = 'latest' | 'price_asc' | 'price_desc' | 'popular';
