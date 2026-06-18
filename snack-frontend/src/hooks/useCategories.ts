import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/categories';
import type { CategoryTree } from '../types/product';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity,
  });
}

export function flattenCategories(categories: CategoryTree[]): Array<{ id: number; label: string; depth: number }> {
  const result: Array<{ id: number; label: string; depth: number }> = [];
  for (const cat of categories) {
    result.push({ id: cat.id, label: cat.name, depth: 0 });
    for (const child of cat.children) {
      result.push({ id: child.id, label: child.name, depth: 1 });
    }
  }
  return result;
}
