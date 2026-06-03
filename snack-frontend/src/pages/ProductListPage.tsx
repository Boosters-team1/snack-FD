import { useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import ProductRegisterModal from '../components/product/ProductRegisterModal';
import Button from '../components/common/Button';
import Dropdown from '../components/common/Dropdown';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useProducts } from '../hooks/useProducts';
import { useProductFilter } from '../hooks/useProductFilter';
import { CATEGORIES } from '../constants/categories';

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'price_asc', label: '가격 낮은순' },
  { value: 'price_desc', label: '가격 높은순' },
  { value: 'popular', label: '인기순' },
];

export default function ProductListPage() {
  const { category, setCategory, sort, setSort } = useProductFilter();
  const { data: products, isLoading } = useProducts({ category: category === 'all' ? undefined : category, sort });
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                category === c.value ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {c.label}
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <ProductRegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
