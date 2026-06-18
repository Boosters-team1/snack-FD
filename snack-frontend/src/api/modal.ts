import axiosInstance from './axiosInstance';
import type { CreateProductModalRequest, ModalProduct } from '../types/modal';

export const createProductModal = async (
  data: CreateProductModalRequest,
): Promise<ModalProduct> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('categoryId', String(data.categoryId));
  formData.append('price', String(data.price));
  if (data.productLink) formData.append('productLink', data.productLink);
  if (data.image) formData.append('image', data.image);

  const res = await axiosInstance.post<ModalProduct>('/modals/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteProductModal = async (
  id: number,
): Promise<{ message: string; id: number }> => {
  const res = await axiosInstance.delete<{ message: string; id: number }>(
    `/modals/products/${id}`,
  );
  return res.data;
};