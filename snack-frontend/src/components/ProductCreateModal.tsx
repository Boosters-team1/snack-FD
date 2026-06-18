import { useState, useRef } from 'react';
import { useCreateProductModal } from '../hooks/useModals';
import type { ModalProduct } from '../types/modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (product: ModalProduct) => void;
}

export default function ProductCreateModal({ isOpen, onClose, onSuccess }: Props) {
  const { loading, error, createProduct } = useCreateProductModal();

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [productLink, setProductLink] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const isValid = Boolean(name.trim() && categoryId && price);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function resetForm() {
    setName('');
    setCategoryId('');
    setPrice('');
    setProductLink('');
    setImage(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  async function handleSubmit() {
    if (!isValid) return;
    const result = await createProduct({
      name,
      categoryId: Number(categoryId),
      price: Number(price),
      productLink: productLink || undefined,
      image: image ?? undefined,
    });
    if (result) {
      onSuccess?.(result);
      handleClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(80,60,40,0.4)] p-5">
      <div className="max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-[20px] bg-white p-9">
        <h2 className="mb-6 text-[18px] font-bold text-[#1A1A1A]">상품 등록</h2>

        <div className="mb-[18px]">
          <label className="mb-[7px] block text-[13px] font-semibold text-[#1A1A1A]">
            상품명
          </label>
          <input
            className="w-full rounded-[10px] border border-[#D9D4CA] px-[14px] py-3 text-[14px] outline-none focus:border-[#F97316]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="상품명을 입력해주세요."
          />
        </div>

        <div className="mb-[18px]">
          <label className="mb-[7px] block text-[13px] font-semibold text-[#1A1A1A]">
            카테고리 ID
          </label>
          <input
            className="w-full rounded-[10px] border border-[#D9D4CA] px-[14px] py-3 text-[14px] outline-none focus:border-[#F97316]"
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            placeholder="카테고리 ID를 입력해주세요."
          />
        </div>

        <div className="mb-[18px]">
          <label className="mb-[7px] block text-[13px] font-semibold text-[#1A1A1A]">
            가격
          </label>
          <input
            className="w-full rounded-[10px] border border-[#D9D4CA] px-[14px] py-3 text-[14px] outline-none focus:border-[#F97316]"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="가격을 입력해주세요."
          />
        </div>

        <div className="mb-[18px]">
          <label className="mb-[7px] block text-[13px] font-semibold text-[#1A1A1A]">
            상품 이미지
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {preview ? (
            <div className="relative inline-block">
              <img
                src={preview}
                alt="미리보기"
                className="h-[90px] w-[90px] rounded-[10px] object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                  if (fileRef.current) fileRef.current.value = '';
                }}
                className="absolute -right-2 -top-2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#1A1A1A] text-[11px] text-white"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-[90px] w-[90px] flex-col items-center justify-center gap-1 rounded-[10px] border border-dashed border-[#D9D4CA] bg-[#FAF8F5] text-[11px] text-[#9A9A9A] hover:border-[#F97316]"
            >
              이미지 선택
            </button>
          )}
        </div>

        <div className="mb-[18px]">
          <label className="mb-[7px] block text-[13px] font-semibold text-[#1A1A1A]">
            제품링크
          </label>
          <input
            className="w-full rounded-[10px] border border-[#D9D4CA] px-[14px] py-3 text-[14px] outline-none focus:border-[#F97316]"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            placeholder="링크를 입력해주세요."
          />
        </div>

        {error && <p className="mb-3 text-[13px] text-[#E24B4A]">{error}</p>}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-[10px] bg-[#FFF0E4] py-[13px] text-[14px] font-semibold text-[#C96A20] hover:opacity-80"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="rounded-[10px] bg-[#F97316] py-[13px] text-[14px] font-bold text-white hover:bg-[#EA6A0A] disabled:bg-[#CACACA]"
          >
            {loading ? '등록 중...' : '등록하기'}
          </button>
        </div>
      </div>
    </div>
  );
}