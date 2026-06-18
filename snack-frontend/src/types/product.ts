export interface Category {
  id: number;
  name: string;
  parentId: number | null;
}

export interface CategoryTree extends Category {
  sortOrder: number;
  children: CategoryTree[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  category: Category;
  imageUrl?: string;
  externalUrl?: string;
  purchaseCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductModalCreateRequest {
  name: string;
  price: number;
  categoryId: number;
  productLink?: string;
  image?: File;
}

export interface ProductModalUpdateRequest {
  name?: string;
  price?: number;
  categoryId?: number;
  productLink?: string;
  image?: File;
}

export type SortOption = '최신순' | '판매순' | '낮은가격순' | '높은가격순';
