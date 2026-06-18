import { useEffect, useState } from 'react';
import { useProfile, useUpdatePassword } from '../hooks/useUsers';

export default function ProfilePage() {
  const { profile, loading: profileLoading, fetchProfile } = useProfile();
  const { loading, error, success, changePassword } = useUpdatePassword();

  const [form, setForm] = useState({
    password: '',
    passwordConfirm: '',
  });
  const [showPw, setShowPw] = useState({
    password: false,
    passwordConfirm: false,
  });

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  const pwMismatch =
    form.passwordConfirm.length > 0 && form.password !== form.passwordConfirm;
  const isValid =
    form.password.length >= 8 && form.password === form.passwordConfirm;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!isValid) return;
    await changePassword(form);
    if (!error) setForm({ password: '', passwordConfirm: '' });
  }

  if (profileLoading) return <div>로딩 중...</div>;

  return (
    <div className="min-h-screen bg-[#FAF8F5] px-6 py-12">
      <div className="mx-auto max-w-[500px]">
        <h1 className="mb-8 text-[22px] font-extrabold text-[#1A1A1A]">
          내 프로필
        </h1>
        <div className="mb-5">
          <label className="mb-2 block text-[13px] font-semibold text-[#1A1A1A]">
            기업명
          </label>
          <input
            className="w-full rounded-xl border border-[#D9D4CA] bg-[#FAF8F5] px-4 py-3 text-[14px] text-[#8E8E8E]"
            value={profile?.companyName ?? ''}
            readOnly
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-[13px] font-semibold text-[#1A1A1A]">
            이름
          </label>
          <input
            className="w-full rounded-xl border border-[#D9D4CA] bg-[#FAF8F5] px-4 py-3 text-[14px] text-[#8E8E8E]"
            value={profile?.name ?? ''}
            readOnly
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-[13px] font-semibold text-[#1A1A1A]">
            이메일
          </label>
          <input
            className="w-full rounded-xl border border-[#D9D4CA] bg-[#FAF8F5] px-4 py-3 text-[14px] text-[#8E8E8E]"
            value={profile?.email ?? ''}
            readOnly
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-[13px] font-semibold text-[#1A1A1A]">
            비밀번호
          </label>
          <div className="relative">
            <input
              className="w-full rounded-xl border border-[#D9D4CA] px-4 py-3 pr-11 text-[14px] text-[#1A1A1A] outline-none focus:border-[#F97316]"
              name="password"
              type={showPw.password ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요."
              autoComplete="new-password"
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E8E8E]"
              type="button"
              onClick={() =>
                setShowPw((p) => ({ ...p, password: !p.password }))
              }
            >
              {showPw.password ? '🙈' : '👁️'}
            </button>
          </div>
          {form.password.length > 0 && form.password.length < 8 && (
            <p className="mt-1 text-[12px] text-[#9A9A9A]">
              비밀번호는 8자 이상이어야 합니다.
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-[13px] font-semibold text-[#1A1A1A]">
            비밀번호 확인
          </label>
          <div className="relative">
            <input
              className={`w-full rounded-xl border px-4 py-3 pr-11 text-[14px] text-[#1A1A1A] outline-none focus:border-[#F97316] ${pwMismatch ? 'border-[#E24B4A]' : 'border-[#D9D4CA]'}`}
              name="passwordConfirm"
              type={showPw.passwordConfirm ? 'text' : 'password'}
              value={form.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              autoComplete="new-password"
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E8E8E]"
              type="button"
              onClick={() =>
                setShowPw((p) => ({ ...p, passwordConfirm: !p.passwordConfirm }))
              }
            >
              {showPw.passwordConfirm ? '🙈' : '👁️'}
            </button>
          </div>
          {pwMismatch && (
            <p className="mt-1 text-[12px] text-[#E24B4A]">
              비밀번호가 일치하지 않아요.
            </p>
          )}
        </div>

        {error && <p className="mb-2 text-[12px] text-[#E24B4A]">{error}</p>}
        {success && (
          <p className="mb-2 text-[13px] font-semibold text-[#22C55E]">
            {success}
          </p>
        )}

        <button
          className="mt-2 w-full rounded-xl bg-[#F97316] py-4 text-[15px] font-bold text-white disabled:bg-[#CACACA]"
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || loading}
        >
          {loading ? '변경 중...' : '변경하기'}
        </button>
      </div>
    </div>
  );
}
