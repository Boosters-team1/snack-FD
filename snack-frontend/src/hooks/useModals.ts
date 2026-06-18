import { useState, useCallback } from 'react';
import { createProductModal, deleteProductModal } from '../api/modal';
import type { CreateProductModalRequest, ModalProduct } from '../types/modal';

export const useCreateProductModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = useCallback(
    async (data: CreateProductModalRequest): Promise<ModalProduct | null> => {
      setLoading(true);
      setError(null);
      try {
        return await createProductModal(data);
      } catch {
        setError('상품 등록에 실패했습니다.');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { loading, error, createProduct };
};

export const useDeleteProductModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeProduct = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteProductModal(id);
      return true;
    } catch {
      setError('상품 삭제에 실패했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, removeProduct };
};
