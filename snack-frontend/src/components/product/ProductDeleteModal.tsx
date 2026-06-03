import Modal from '../common/Modal';
import Button from '../common/Button';
import { useDeleteProduct } from '../../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

interface ProductDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
}

export default function ProductDeleteModal({ isOpen, onClose, productId, productName }: ProductDeleteModalProps) {
  const { mutate, isPending } = useDeleteProduct();
  const navigate = useNavigate();

  const handleDelete = () => {
    mutate(productId, {
      onSuccess: () => {
        onClose();
        navigate('/products');
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="상품 삭제">
      <p className="mb-6 text-gray-600">
        <span className="font-semibold text-gray-900">{productName}</span>을(를) 삭제하시겠습니까?
        <br />
        <span className="text-sm text-red-500">삭제된 상품은 복구할 수 없습니다.</span>
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>취소</Button>
        <Button variant="danger" onClick={handleDelete} disabled={isPending}>삭제</Button>
      </div>
    </Modal>
  );
}
