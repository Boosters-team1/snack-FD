import { useState } from 'react';
import type { SortOption } from '../types/product';

export function useProductFilter() {
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<SortOption>('latest');

  return { category, setCategory, sort, setSort };
}
