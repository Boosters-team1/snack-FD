import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { MAIN_CATEGORIES } from '../constants/categories';
import cokeZeroImg from '../assets/images/cokezero.png';

const MOCK_PRODUCT = {
  name: '코카콜라 제로',
  mainCategory: 'beverage',
  subCategory: 'cola',
  categoryLabel: '청량·탄산음료',
  purchaseCount: 29,
  price: 2000,
  imageUrl: cokeZeroImg,
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

      <div className="px-[120px] pb-10 pt-20">
        {/* 브레드크럼 */}
        <nav className="mb-8 flex items-center gap-2 text-[20px] text-[#ABABAB]">
          <Link to="/products" className="transition-colors hover:text-orange-500">홈</Link>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M9 18L15 12L9 6" stroke="#ABABAB" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <Link to={`/products?category=${product.mainCategory}`} className="transition-colors hover:text-orange-500">
            {activeMain.label}
          </Link>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M9 18L15 12L9 6" stroke="#ABABAB" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#1F1F1F]">{product.categoryLabel}</span>
        </nav>

        {/* 상품 상세 */}
        <div className="grid gap-20" style={{ gridTemplateColumns: '828px 1fr' }}>
          {/* 이미지 */}
          <div
            className="flex items-center justify-center rounded-[20px] bg-white"
            style={{
              width: 828,
              height: 828,
              padding: '73px 120px',
              boxShadow: '4px 4px 20px 0px rgba(250, 247, 243, 0.25)',
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: 280, height: 486, objectFit: 'cover' }}
            />
          </div>

          {/* 상품 정보 */}
          <div className="flex flex-col py-4">
            <p className="text-[20px] font-normal leading-8 text-[#999999]">{product.categoryLabel}</p>
            <h1 className="mt-2 text-[32px] font-semibold leading-[42px] text-[#1F1F1F]">{product.name}</h1>

            <span className="mt-6 inline-flex w-fit items-center rounded-md bg-[#FEE8B0] px-2 py-1 text-[20px] font-semibold leading-8 text-[#F97B22]">
              {product.purchaseCount}회 구매
            </span>

            <p className="mt-6 text-[32px] font-bold leading-[42px] text-[#1F1F1F]">{formatPrice(product.price)}</p>

            <hr className="mt-8 border-[#E0E0E0]" />

            <div className="mt-8 flex flex-col gap-2 text-[20px] font-medium leading-8">
              <div className="flex gap-6">
                <span className="w-20 shrink-0 text-[#1F1F1F]">구매혜택</span>
                <span className="text-[#6B6B6B]">5포인트 적립 예정</span>
              </div>
              <div className="flex gap-6">
                <span className="w-20 shrink-0 text-[#1F1F1F]">배송방법</span>
                <span className="text-[#6B6B6B]">택배</span>
              </div>
              <div className="flex gap-4">
                <span className="w-20 shrink-0 text-[#1F1F1F]">배송비</span>
                <div className="flex items-center">
                  <span className="text-[#6B6B6B]">3,000원(50,000원 이상 무료배송)</span>
                  <span className="mx-6 text-[#E0E0E0]">|</span>
                  <span className="text-[#C4C4C4]">도서산간 배송비 추가</span>
                </div>
              </div>
            </div>

            <hr className="mt-8 border-[#E0E0E0]" />
          </div>
        </div>
      </div>
    </div>
  );
}
