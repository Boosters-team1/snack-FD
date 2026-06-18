import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../stores/authStore';
import { updateProfile, updatePassword } from '../api/auth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function ProfilePage() {
  const { user } = useAuth();
  const { setAuth, accessToken } = useAuthStore();
  const [form, setForm] = useState({
    companyName: user?.companyName ?? '',
    name: user?.name ?? '',
    password: '',
    passwordConfirm: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password && form.password !== form.passwordConfirm) {
      setMessage('비밀번호가 일치하지 않습니다.');
      setIsError(true);
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const updated = await updateProfile({ companyName: form.companyName, name: form.name });
      setAuth(updated, accessToken!);

      if (form.password) {
        await updatePassword({ password: form.password, passwordConfirm: form.passwordConfirm });
      }

      setMessage('변경사항이 저장되었습니다.');
      setIsError(false);
      setForm((prev) => ({ ...prev, password: '', passwordConfirm: '' }));
    } catch {
      setMessage('저장에 실패했습니다.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">내 프로필</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="기업명" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
        <Input label="이름" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="이메일" value={user?.email ?? ''} disabled />
        <Input label="비밀번호" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="변경 시에만 입력하세요." />
        <Input label="비밀번호 확인" type="password" value={form.passwordConfirm} onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })} placeholder="비밀번호를 다시 한 번 입력해주세요." />
        {message && <p className={`text-sm ${isError ? 'text-red-500' : 'text-orange-500'}`}>{message}</p>}
        <Button type="submit" fullWidth disabled={loading}>{loading ? '저장 중...' : '변경하기'}</Button>
      </form>
    </div>
  );
}
