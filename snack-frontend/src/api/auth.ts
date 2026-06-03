import axiosInstance from './axiosInstance';
import type { LoginRequest, SignupRequest, ProfileUpdateRequest, AuthResponse, User } from '../types/auth';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>('/auth/login', data);
  return res.data;
};

export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>('/auth/signup', data);
  return res.data;
};

export const getProfile = async (): Promise<User> => {
  const res = await axiosInstance.get<User>('/auth/me');
  return res.data;
};

export const updateProfile = async (data: ProfileUpdateRequest): Promise<User> => {
  const res = await axiosInstance.patch<User>('/auth/me', data);
  return res.data;
};
