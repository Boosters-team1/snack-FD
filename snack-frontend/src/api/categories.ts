import axiosInstance from './axiosInstance';
import type { CategoryTree } from '../types/product';

export const getCategories = async (): Promise<CategoryTree[]> => {
  const res = await axiosInstance.get<CategoryTree[]>('/categories');
  return res.data;
};
