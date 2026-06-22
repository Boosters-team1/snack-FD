import axiosInstance from './axiosInstance';
import type { JwtUser, UpdatePasswordRequest } from '../types/user';

export const getProfile = async (): Promise<JwtUser> => {
  const { data } = await axiosInstance.get<JwtUser>('/users/me');
  return data;
};

export const updatePassword = async (
  body: UpdatePasswordRequest,
): Promise<{ message: string }> => {
  const { data } = await axiosInstance.patch<{ message: string }>(
    '/users/me/password',
    body,
  );
  return data;
};