import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useProductFilter } from "../hooks/useProductFilter";
import ProductCard from "../components/product/ProductCard";
import ProductRegisterModal from "../components/product/ProductRegisterModal";
import Dropdown from "../components/common/Dropdown";
import { MAIN_CATEGORIES, CATEGORIES } from "../constants/categories";
import type { SortOption } from "../types/product";
import cokeZero from "../assets/images/cokezero.png";
import coke from "../assets/images/coke.png";
import fanta from "../assets/images/fanta.png";
import sprite from "../assets/images/sprite.png";

const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "판매순" },
  { value: "price_asc", label: "낮은가격순" },
  { value: "price_desc", label: "높은가격순" },
];

const PAGE_SIZE = 8;

export default function ProductListPage() {
  const { sort, setSort } = useProductFilter();
  const [mainCategory, setMainCategory] = useState(MAIN_CATEGORIES[0].value);
  const [subCategory, setSubCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const activeMain = MAIN_CATEGORIES.find((c) => c.value === mainCategory)!;
  const mainCategoryIndex = MAIN_CATEGORIES.findIndex((c) => c.value === mainCategory);
  const categoryId = mainCategoryIndex >= 0 ? CATEGORIES[mainCategoryIndex].id : undefined;

  const { data: apiData, isLoading } = useProducts({
    categoryId,
    sort,
  });

  const MOCK_PRODUCTS = [
    {
      id: 1,
      name: "코카콜라 제로",
      price: 2000,
      category: "청량·탄산음료",
      description: "",
      purchaseCount: 29,
      imageUrl: cokeZero,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 2,
      name: "코카콜라",
      price: 2000,
      category: "청량·탄산음료",
      description: "",
      purchaseCount: 29,
      imageUrl: coke,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 3,
      name: "환타 오렌지",
      price: 2000,
      category: "청량·탄산음료",
      description: "",
      purchaseCount: 29,
      imageUrl: fanta,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 4,
      name: "스프라이트",
      price: 2000,
      category: "청량·탄산음료",
      description: "",
      purchaseCount: 29,
      imageUrl: sprite,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 5,
      name: "코카콜라 제로",
      price: 2000,
      category: "청량·탄산음료",
      description: "",
      purchaseCount: 29,
      imageUrl: cokeZero,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 6,
      name: "코카콜라",
      price: 2000,
      category: "청량·탄산음료",
      description: "",
      purchaseCount: 29,
      imageUrl: coke,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 7,
      name: "환타 오렌지",
      price: 2000,
      category: "청량·탄산음료",
      description: "",
      purchaseCount: 29,
      imageUrl: fanta,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 8,
      name: "스프라이트",
      price: 2000,
      category: "청량·탄산음료",
      description: "",
      purchaseCount: 29,
      imageUrl: sprite,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 9,
      name: "코카콜라 제로",
      price: 2000,
      category: "청량·탄산음료",
      description: "",
      purchaseCount: 15,
      imageUrl: cokeZero,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 10,
      name: "코카콜라",
      price: 2000,
      category: "청량·탄산음료",
      description: "",
      purchaseCount: 22,
      imageUrl: coke,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 11,
      name: "환타 오렌지",
      price: 2000,
      category: "청량·탄산음료",
      description: "",
      purchaseCount: 18,
      imageUrl: fanta,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 12,
      name: "스프라이트",
      price: 2000,
      category: "청량·탄산음료",
      description: "",
      purchaseCount: 11,
      imageUrl: sprite,
      createdAt: "",
      updatedAt: "",
    },
  ];

  const fetchedProducts = Array.isArray(apiData) ? apiData : [];
  const products = fetchedProducts.length > 0 ? fetchedProducts : MOCK_PRODUCTS;

  const handleMainCategory = (value: string) => {
    setMainCategory(value);
    setSubCategory("");
    setPage(1);
  };

  const handleSubCategory = (value: string) => {
    setSubCategory((prev) => (prev === value ? "" : value));
    setPage(1);
  };

  const displayed = products.slice(0, page * PAGE_SIZE);
  const hasMore = products.length > displayed.length;

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      {/* 1단계 카테고리 탭 */}
      <div className="sticky top-[88px] z-30 border-b border-[#E6E6E6] bg-[#FBF8F4]">
        <div className="flex h-[64px] items-center gap-3 px-[120px]">
          {MAIN_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleMainCategory(cat.value)}
              className={`relative h-full px-3 text-sm transition-colors ${
                mainCategory === cat.value
                  ? "font-semibold text-[#F97316] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#F97316]"
                  : "text-[#ABABAB] hover:text-gray-600"
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
          {activeMain.sub.map((sub) => (
            <button
              key={sub.value}
              onClick={() => handleSubCategory(sub.value)}
              className={`relative h-full px-3 text-sm transition-colors ${
                subCategory === sub.value
                  ? "font-semibold text-[#F97316] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#F97316]"
                  : "text-[#ABABAB] hover:text-gray-600"
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative px-[120px] pb-[48px]">
        {/* 정렬 드롭다운 */}
        <div className="absolute right-0 top-6 flex justify-end">
          <Dropdown
            options={SORT_OPTIONS}
            value={sort}
            onChange={(v) => setSort(v as SortOption)}
          />
        </div>

        {/* 상품 그리드 */}
        {isLoading ? (
          <div className="flex justify-center pt-[98px]">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-400 border-t-transparent" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center pt-[98px] text-sm text-gray-400">
            상품이 없어요
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6 pt-[98px]">
            {displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* 더보기 버튼 */}
        {hasMore && (
          <div className="mt-[136px] flex justify-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="flex h-[64px] w-[640px] items-center justify-center gap-[10px] rounded-[16px] border border-[#F97B22] bg-white text-[#F97B22] shadow-[4px_4px_10px_0px_rgba(195,217,242,0.20)] hover:bg-orange-50"
            >
              더보기
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 6L8 11L13 6"
                  stroke="#F97B22"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* + 상품 등록 버튼 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 flex items-center gap-[10px] rounded-[100px] bg-[#64D396] pb-4 pl-4 pr-5 pt-4 text-sm font-semibold text-white shadow-[0px_4px_8px_0px_rgba(0,0,0,0.08)] hover:bg-[#4ec584]"
      >
        + 상품 등록
      </button>

      <ProductRegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
