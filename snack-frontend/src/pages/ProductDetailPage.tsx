import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProductEditModal from '../components/product/ProductEditModal';
import ProductDeleteModal from '../components/product/ProductDeleteModal';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(Number(id));
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading) return <div className="py-20"><LoadingSpinner size="lg" /></div>;
  if (!product) return <p className="py-20 text-center text-gray-400">상품을 찾을 수 없습니다.</p>;

  return (
    <div className="mx-auto max-w-2xl">
      {product.imageUrl ? (
        <img src={product.imageUrl} alt={product.name} className="mb-6 h-64 w-full rounded-2xl object-cover" />
      ) : (
        <div className="mb-6 flex h-64 w-full items-center justify-center rounded-2xl bg-gray-100 text-6xl">🍿</div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400">{product.category?.name}</p>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-1 text-xl font-bold text-orange-500">{formatPrice(product.price)}</p>
        </div>
        <Badge count={product.purchaseCount} />
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="secondary" onClick={() => setIsEditOpen(true)}>수정</Button>
        <Button variant="danger" onClick={() => setIsDeleteOpen(true)}>삭제</Button>
      </div>

      <ProductEditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} product={product} />
      <ProductDeleteModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} productId={product.id} productName={product.name} />
    </div>
  );
}
