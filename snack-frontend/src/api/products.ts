import axiosInstance from './axiosInstance';
import type { Product, ProductModalCreateRequest, ProductModalUpdateRequest } from '../types/product';

export const getProducts = async (params?: {
  categoryId?: number;
  sort?: string;
  page?: number;
}): Promise<{ products: Product[]; total: number; page: number }> => {
  const res = await axiosInstance.get<{ products: Product[]; total: number; page: number }>('/products', { params });
  return res.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const res = await axiosInstance.get<Product>(`/products/${id}`);
  return res.data;
};

const toFormData = (data: Record<string, string | number | File | undefined>): FormData => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  }
  return formData;
};

export const createProduct = async (data: ProductModalCreateRequest): Promise<Product> => {
  const res = await axiosInstance.post<Product>('/modals/products', toFormData({ ...data }));
  return res.data;
};

export const updateProduct = async (id: number, data: ProductModalUpdateRequest): Promise<Product> => {
  const res = await axiosInstance.patch<Product>(`/modals/products/${id}`, toFormData({ ...data }));
  return res.data;
};

export const deleteProduct = async (id: number): Promise<{ message: string; id: number }> => {
  const res = await axiosInstance.delete<{ message: string; id: number }>(`/modals/products/${id}`);
  return res.data;
};
