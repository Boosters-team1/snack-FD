import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatPrice';
import Badge from '../common/Badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="mb-3 h-40 w-full rounded-xl object-cover"
          />
        ) : (
          <div className="mb-3 flex h-40 w-full items-center justify-center rounded-xl bg-gray-100 text-4xl">
            🍿
          </div>
        )}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-gray-400">{product.category}</p>
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm font-bold text-orange-500">{formatPrice(product.price)}</p>
          </div>
          <Badge count={product.purchaseCount} />
        </div>
      </div>
    </Link>
  );
}
