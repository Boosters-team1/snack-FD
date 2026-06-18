import { useDeleteProductModal } from '../hooks/useModals';

interface Props {
  isOpen: boolean;
  productId: number | null;
  productName?: string;
  onClose: () => void;
  onSuccess?: (id: number) => void;
}

export default function ProductDeleteModal({
  isOpen,
  productId,
  productName,
  onClose,
  onSuccess,
}: Props) {
  const { loading, error, removeProduct } = useDeleteProductModal();

  if (!isOpen || productId === null) return null;

  async function handleDelete() {
    if (productId === null) return;
    const success = await removeProduct(productId);
    if (success) {
      onSuccess?.(productId);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.45)] p-5">
      <div className="w-full max-w-[380px] rounded-[20px] bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF4ED] text-[24px] text-[#F97316]">
          !
        </div>
        <h2 className="mb-2 text-[16px] font-bold text-[#1A1A1A]">상품 삭제</h2>
        <p className="mb-1 text-[14px] text-[#1A1A1A]">
          {productName ?? '이 상품'}을 삭제할까요?
        </p>
        <p className="mb-6 text-[13px] text-[#9A9A9A]">
          상품 삭제 후에는 복구할 수 없어요!
        </p>

        {error && <p className="mb-3 text-[13px] text-[#E24B4A]">{error}</p>}

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[10px] bg-[#FFF0E4] py-[13px] text-[14px] font-semibold text-[#C96A20] hover:opacity-80"
          >
            더 생각해볼게요
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-[10px] bg-[#F97316] py-[13px] text-[14px] font-bold text-white hover:bg-[#EA6A0A] disabled:bg-[#CACACA]"
          >
            {loading ? '삭제 중...' : '삭제할래요'}
          </button>
        </div>
      </div>
    </div>
  );
}