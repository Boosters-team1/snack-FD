import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useProductFilter } from "../hooks/useProductFilter";
import { useCategories } from "../hooks/useCategories";
import ProductCard from "../components/product/ProductCard";
import ProductRegisterModal from "../components/product/ProductRegisterModal";
import Dropdown from "../components/common/Dropdown";
import type { SortOption } from "../types/product";

// BE 가 한글 정렬 값을 그대로 받음 (SortOption 과 동일)
const SORT_OPTIONS = [
  { value: "최신순", label: "최신순" },
  { value: "판매순", label: "판매순" },
  { value: "낮은가격순", label: "낮은가격순" },
  { value: "높은가격순", label: "높은가격순" },
];

export default function ProductListPage() {
  const { sort, setSort } = useProductFilter();
  const { data: categoryTree = [] } = useCategories();
  const [mainId, setMainId] = useState<number | null>(null);
  const [subId, setSubId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 카테고리 트리가 로드되기 전엔 첫 카테고리를 기본 선택으로 사용
  const activeMain = categoryTree.find((c) => c.id === mainId) ?? categoryTree[0];
  const categoryId = subId ?? activeMain?.id;

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProducts({ categoryId, sort });

  const products = data?.pages.flatMap((p) => p.products) ?? [];

  const handleMainCategory = (id: number) => {
    setMainId(id);
    setSubId(null);
  };

  const handleSubCategory = (id: number) => {
    setSubId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      {/* 1단계 카테고리 탭 */}
      <div className="sticky top-[88px] z-30 border-b border-[#E6E6E6] bg-[#FBF8F4]">
        <div className="flex h-[64px] items-center gap-3 px-[120px]">
          {categoryTree.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleMainCategory(cat.id)}
              className={`relative h-full px-3 text-sm transition-colors ${
                activeMain?.id === cat.id
                  ? "font-semibold text-[#F97316] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#F97316]"
                  : "text-[#ABABAB] hover:text-gray-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 2단계 서브 카테고리 탭 */}
      {activeMain && activeMain.children.length > 0 && (
        <div className="sticky top-[152px] z-20 border-b border-[#E6E6E6] bg-[#FBF8F4]">
          <div className="flex h-[64px] items-center gap-3 px-[120px]">
            {activeMain.children.map((sub) => (
              <button
                key={sub.id}
                onClick={() => handleSubCategory(sub.id)}
                className={`relative h-full px-3 text-sm transition-colors ${
                  subId === sub.id
                    ? "font-semibold text-[#F97316] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#F97316]"
                    : "text-[#ABABAB] hover:text-gray-600"
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}

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
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* 더보기 버튼 (서버 무한쿼리) */}
        {hasNextPage && (
          <div className="mt-[136px] flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="flex h-[64px] w-[640px] items-center justify-center gap-[10px] rounded-[16px] border border-[#F97B22] bg-white text-[#F97B22] shadow-[4px_4px_10px_0px_rgba(195,217,242,0.20)] hover:bg-orange-50 disabled:opacity-60"
            >
              {isFetchingNextPage ? "불러오는 중..." : "더보기"}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 6L8 11L13 6" stroke="#F97B22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
