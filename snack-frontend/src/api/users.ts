import axiosInstance from './axiosInstance';
import type { ApiResponse } from '../types/auth';
import type { JwtUser, UpdatePasswordRequest } from '../types/user';

export const getProfile = async (): Promise<JwtUser> => {
  const { data } = await axiosInstance.get<ApiResponse<JwtUser>>('/users/me');
  return data.data;
};

export const updatePassword = async (
  body: UpdatePasswordRequest,
): Promise<{ message: string }> => {
  const { data } = await axiosInstance.patch<ApiResponse<unknown>>(
    '/users/me/password',
    body,
  );
  return { message: data.message ?? '비밀번호가 변경되었습니다.' };
};
