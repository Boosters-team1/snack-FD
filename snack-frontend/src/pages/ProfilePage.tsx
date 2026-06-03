import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../stores/authStore';
import { updateProfile } from '../api/auth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function ProfilePage() {
  const { user } = useAuth();
  const setAuth = useAuthStore((s) => s.setAuth);
  const accessToken = useAuthStore((s) => s.accessToken)!;
  const [username, setUsername] = useState(user?.username ?? '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const updated = await updateProfile({ username });
      setAuth(updated, accessToken);
      setMessage('프로필이 업데이트되었습니다.');
    } catch {
      setMessage('업데이트에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">프로필 설정</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="이메일" value={user?.email ?? ''} disabled />
        <Input label="닉네임" value={username} onChange={(e) => setUsername(e.target.value)} required />
        {message && <p className="text-sm text-orange-500">{message}</p>}
        <Button type="submit" fullWidth disabled={loading}>{loading ? '저장 중...' : '저장'}</Button>
      </form>
    </div>
  );
}
