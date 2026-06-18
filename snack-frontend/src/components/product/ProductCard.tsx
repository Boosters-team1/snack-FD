import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`} className="block">
      {/* 이미지 컨테이너 */}
      <div className="aspect-square overflow-hidden rounded-[20px] bg-white shadow-[4px_4px_20px_0px_rgba(250,247,243,0.25)]">
        <div className="flex h-full w-full items-center justify-center px-[30%] py-[18%]">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="h-full w-full bg-gray-50" />
          )}
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="mt-6">
        {/* 카테고리 + 구매 횟수 배지 */}
        <div className="flex items-center justify-between">
          <p className="text-base font-normal leading-[26px] text-[#999999]">
            {product.category}
          </p>
          <div className="inline-flex items-center bg-[#FEE8B0] px-2 py-1">
            <span className="text-base font-semibold leading-[26px] text-[#F97B22]">
              {product.purchaseCount}회 구매
            </span>
          </div>
        </div>

        {/* 상품명 */}
        <h3 className="mt-2 text-xl font-semibold leading-8 text-[#1F1F1F]">
          {product.name}
        </h3>

        {/* 가격 */}
        <p className="mt-4 text-[32px] font-bold leading-[42px] text-[#1F1F1F]">
          {product.price.toLocaleString()}원
        </p>
      </div>
    </Link>
  );
}
