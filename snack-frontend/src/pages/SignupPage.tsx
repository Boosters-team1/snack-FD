import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { signup, getProfile } from '../api/auth';
import { useAuthStore } from '../stores/authStore';

export default function SignupPage() {
  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setToken, setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await signup(form);
      setToken(res.accessToken);
      const user = await getProfile();
      setAuth(user, res.accessToken);
      navigate('/products');
    } catch {
      setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-20 w-full max-w-sm px-4">
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">회원가입</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input id="email" label="이메일" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input id="password" label="비밀번호" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <Input id="passwordConfirm" label="비밀번호 확인" type="password" value={form.passwordConfirm} onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })} required />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" fullWidth disabled={loading}>{loading ? '가입 중...' : '회원가입'}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="font-medium text-orange-500 hover:underline">로그인</Link>
      </p>
    </div>
  );
}
