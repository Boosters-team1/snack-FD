import { useState, useCallback } from 'react';
import { getProfile, updatePassword } from '../api/users';
import type { JwtUser, UpdatePasswordRequest } from '../types/user';

export const useProfile = () => {
  const [profile, setProfile] = useState<JwtUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProfile();
      setProfile(data);
    } catch {
      setError('프로필을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { profile, loading, error, fetchProfile };
};

export const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const changePassword = useCallback(async (body: UpdatePasswordRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await updatePassword(body);
      setSuccess(data.message);
    } catch {
      setError('비밀번호 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, success, changePassword };
};