import { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { useCreateProduct } from '../../hooks/useProducts';
import { useCategories, flattenCategories } from '../../hooks/useCategories';

interface ProductRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM = { name: '', price: '', categoryId: 0, productLink: '', image: undefined as File | undefined };

export default function ProductRegisterModal({ isOpen, onClose }: ProductRegisterModalProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const { mutate, isPending } = useCreateProduct();
  const { data: categoryTree = [] } = useCategories();
  const flatCategories = flattenCategories(categoryTree);
  const defaultCategoryId = form.categoryId || flatCategories[0]?.id || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { name: form.name, price: Number(form.price), categoryId: defaultCategoryId, productLink: form.productLink || undefined, image: form.image },
      { onSuccess: () => { onClose(); setForm(EMPTY_FORM); } }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="상품 등록">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="상품명" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input label="가격" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">카테고리</label>
          <select
            value={defaultCategoryId}
            onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
          >
            {flatCategories.map((c) => (
              <option key={c.id} value={c.id}>{c.depth > 0 ? `ㄴ ${c.label}` : c.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">이미지</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files?.[0] })}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <Input label="상품 링크 (선택)" value={form.productLink} onChange={(e) => setForm({ ...form, productLink: e.target.value })} />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>취소</Button>
          <Button type="submit" disabled={isPending}>등록</Button>
        </div>
      </form>
    </Modal>
  );
}
