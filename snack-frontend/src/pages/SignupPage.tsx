import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import { useAuthStore } from '../stores/authStore';
import { EyeIcon, FIELD_CLASS } from '../components/common/authField';

export default function SignupPage() {
  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '' });
  const [show, setShow] = useState({ password: false, passwordConfirm: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const isValid =
    form.email.trim() !== '' && form.password !== '' && form.passwordConfirm !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const user = await signup(form);
      setAuth(user);
      navigate('/products');
    } catch {
      setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[640px] pb-16 pt-[88px]">
      <h1 className="mb-12 text-[32px] font-bold text-black-400">회원가입</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        {/* 이메일 */}
        <div>
          <label htmlFor="email" className="mb-2.5 block text-[15px] font-medium text-black-400">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
            autoComplete="email"
            required
            className={FIELD_CLASS}
          />
        </div>

        {/* 비밀번호 */}
        <div>
          <label htmlFor="password" className="mb-2.5 block text-[15px] font-medium text-black-400">
            비밀번호
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show.password ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              autoComplete="new-password"
              required
              className={`${FIELD_CLASS} pr-14`}
            />
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, password: !s.password }))}
              className="absolute inset-y-0 right-5 flex items-center text-gray-300 hover:text-gray-400"
              aria-label="비밀번호 표시 전환"
            >
              <EyeIcon off={!show.password} />
            </button>
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label
            htmlFor="passwordConfirm"
            className="mb-2.5 block text-[15px] font-medium text-black-400"
          >
            비밀번호 확인
          </label>
          <div className="relative">
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type={show.passwordConfirm ? 'text' : 'password'}
              value={form.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력해주세요"
              autoComplete="new-password"
              required
              className={`${FIELD_CLASS} pr-14`}
            />
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, passwordConfirm: !s.passwordConfirm }))}
              className="absolute inset-y-0 right-5 flex items-center text-gray-300 hover:text-gray-400"
              aria-label="비밀번호 확인 표시 전환"
            >
              <EyeIcon off={!show.passwordConfirm} />
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={!isValid || loading}
          className="mt-4 h-[64px] w-full rounded-[16px] text-[17px] font-bold text-white transition-colors enabled:bg-primary-400 enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:bg-gray-200"
        >
          {loading ? '가입 중...' : '회원가입'}
        </button>
      </form>

      <p className="mt-7 text-center text-[15px] text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="font-medium text-primary-400 underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
