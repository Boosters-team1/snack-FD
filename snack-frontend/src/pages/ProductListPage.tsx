import { useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import ProductRegisterModal from '../components/product/ProductRegisterModal';
import Button from '../components/common/Button';
import Dropdown from '../components/common/Dropdown';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useProducts } from '../hooks/useProducts';
import { useProductFilter } from '../hooks/useProductFilter';
import { useCategories } from '../hooks/useCategories';

const SORT_OPTIONS = [
  { value: '최신순', label: '최신순' },
  { value: '낮은가격순', label: '가격 낮은순' },
  { value: '높은가격순', label: '가격 높은순' },
  { value: '판매순', label: '인기순' },
];

export default function ProductListPage() {
  const { categoryId, setCategoryId, sort, setSort } = useProductFilter();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts({ categoryId, sort });
  const { data: categoryTree = [] } = useCategories();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryId(undefined)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              categoryId === undefined ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            전체
          </button>
          {categoryTree.map((parent) => (
            <button
              key={parent.id}
              onClick={() => setCategoryId(parent.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                categoryId === parent.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {parent.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Dropdown options={SORT_OPTIONS} value={sort} onChange={(v) => setSort(v as typeof sort)} />
          <Button size="sm" onClick={() => setIsRegisterOpen(true)}>+ 상품 등록</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20"><LoadingSpinner size="lg" /></div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasNextPage && (
            <div className="mt-8 flex justify-center">
              <Button variant="secondary" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? '불러오는 중...' : '더보기'}
              </Button>
            </div>
          )}
        </>
      )}

      <ProductRegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
