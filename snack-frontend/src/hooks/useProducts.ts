import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../api/products';
import type { ProductModalCreateRequest, ProductModalUpdateRequest } from '../types/product';

export function useProducts(params?: { categoryIds?: number[]; sort?: string }) {
  const categoryIds = params?.categoryIds ?? [];
  return useInfiniteQuery({
    queryKey: ['products', params],
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      // 카테고리 미지정: 전체 조회
      if (categoryIds.length === 0) {
        return getProducts({ sort: params?.sort, page });
      }
      // 부모 카테고리 선택 시 자식 카테고리들을 병렬 조회 후 병합
      // (BE 가 부모/다중 categoryId 조회를 지원하지 않아 프론트에서 합침)
      const results = await Promise.all(
        categoryIds.map((categoryId) => getProducts({ categoryId, sort: params?.sort, page })),
      );
      return {
        products: results.flatMap((r) => r.products),
        total: results.reduce((sum, r) => sum + r.total, 0),
        page,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / 8);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductModalCreateRequest) => createProduct(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateProduct(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductModalUpdateRequest) => updateProduct(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}
