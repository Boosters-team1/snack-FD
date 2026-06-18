export interface CreateProductModalRequest {
  name: string;
  categoryId: number;
  price: number;
  productLink?: string;
  image?: File;
}

export interface ModalProduct {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  externalUrl: string | null;
  imageUrl: string | null;
  purchaseCount: number;
  createdByUserId: number;
  createdAt: string;
  updatedAt: string;
}