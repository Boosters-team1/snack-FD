import axiosInstance from './axiosInstance';
import type { Product, ProductCreateRequest, ProductUpdateRequest } from '../types/product';

export const getProducts = async (params?: {
  category?: string;
  sort?: string;
  page?: number;
}): Promise<Product[]> => {
  const res = await axiosInstance.get<Product[]>('/products', { params });
  return res.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const res = await axiosInstance.get<Product>(`/products/${id}`);
  return res.data;
};

export const createProduct = async (data: ProductCreateRequest): Promise<Product> => {
  const res = await axiosInstance.post<Product>('/products', data);
  return res.data;
};

export const updateProduct = async (id: number, data: ProductUpdateRequest): Promise<Product> => {
  const res = await axiosInstance.patch<Product>(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};
