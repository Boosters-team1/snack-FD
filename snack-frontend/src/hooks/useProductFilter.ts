import { useState } from 'react';
import type { SortOption } from '../types/product';

export function useProductFilter() {
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<SortOption>('최신순');

  return { categoryId, setCategoryId, sort, setSort };
}
