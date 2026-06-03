import { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { CATEGORIES } from '../../constants/categories';
import { useCreateProduct } from '../../hooks/useProducts';

interface ProductRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductRegisterModal({ isOpen, onClose }: ProductRegisterModalProps) {
  const [form, setForm] = useState({ name: '', price: '', category: 'snack', description: '', imageUrl: '' });
  const { mutate, isPending } = useCreateProduct();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { ...form, price: Number(form.price) },
      { onSuccess: () => { onClose(); setForm({ name: '', price: '', category: 'snack', description: '', imageUrl: '' }); } }
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
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
          >
            {CATEGORIES.filter((c) => c.value !== 'all').map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <Input label="설명" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Input label="이미지 URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>취소</Button>
          <Button type="submit" disabled={isPending}>등록</Button>
        </div>
      </form>
    </Modal>
  );
}
