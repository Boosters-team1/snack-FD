import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { MAIN_CATEGORIES } from '../constants/categories';

const MOCK_PRODUCT = {
  name: '코카콜라 제로',
  mainCategory: 'beverage',
  subCategory: 'cola',
  categoryLabel: '청량·탄산음료',
  purchaseCount: 29,
  price: 2000,
  imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400',
};

export default function ProductDetailPage() {
  const product = MOCK_PRODUCT;
  const activeMain = MAIN_CATEGORIES.find(c => c.value === product.mainCategory)!;

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      {/* 1단계 카테고리 탭 */}
      <div className="sticky top-[88px] z-30 border-b border-[#E6E6E6] bg-[#FBF8F4]">
        <div className="flex h-[64px] items-center gap-3 px-[120px]">
          {MAIN_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              className={`relative h-full px-3 text-sm transition-colors ${
                cat.value === product.mainCategory
                  ? 'font-semibold text-[#F97316] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#F97316]'
                  : 'text-[#ABABAB] hover:text-gray-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2단계 서브 카테고리 탭 */}
      <div className="sticky top-[152px] z-20 border-b border-[#E6E6E6] bg-[#FBF8F4]">
        <div className="flex h-[64px] items-center gap-3 px-[120px]">
          {activeMain.sub.map(sub => (
            <button
              key={sub.value}
              className={`relative h-full px-3 text-sm transition-colors ${
                sub.value === product.subCategory
                  ? 'font-semibold text-[#F97316] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#F97316]'
                  : 'text-[#ABABAB] hover:text-gray-600'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-[120px] py-10">
        {/* 브레드크럼 */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#ABABAB]">
          <Link to="/products" className="transition-colors hover:text-orange-500">홈</Link>
          <span>›</span>
          <Link to={`/products?category=${product.mainCategory}`} className="transition-colors hover:text-orange-500">
            {activeMain.label}
          </Link>
          <span>›</span>
          <span className="text-gray-600">{product.categoryLabel}</span>
        </nav>

        {/* 상품 상세 */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* 이미지 */}
          <div className="flex min-h-[420px] items-center justify-center rounded-2xl bg-white px-12 py-16">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-80 w-full object-contain"
            />
          </div>

          {/* 상품 정보 */}
          <div className="flex flex-col gap-5 py-4">
            <div>
              <p className="text-sm text-[#ABABAB]">{product.categoryLabel}</p>
              <h1 className="mt-1 text-[26px] font-bold text-gray-900">{product.name}</h1>
            </div>

            <span className="inline-flex w-fit items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
              {product.purchaseCount}회 구매
            </span>

            <p className="text-[26px] font-bold text-gray-900">{formatPrice(product.price)}</p>

            <hr className="border-[#E6E6E6]" />

            <div className="flex flex-col gap-4 text-sm">
              <div className="flex gap-10">
                <span className="w-16 shrink-0 text-[#ABABAB]">구매혜택</span>
                <span className="text-gray-700">5포인트 적립 예정</span>
              </div>
              <div className="flex gap-10">
                <span className="w-16 shrink-0 text-[#ABABAB]">배송방법</span>
                <span className="text-gray-700">택배</span>
              </div>
              <div className="flex gap-10">
                <span className="w-16 shrink-0 text-[#ABABAB]">배송비</span>
                <span className="text-gray-700">
                  3,000원(50,000원 이상 무료배송)
                  <span className="mx-2 text-gray-300">·</span>
                  <span className="text-[#ABABAB]">도서산간 배송비 추가</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
