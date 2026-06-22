import axiosInstance from './axiosInstance';
import type { LoginRequest, SignupRequest, ApiResponse, User } from '../types/auth';

// 로그인/회원가입 성공 시 백엔드는 인증 쿠키를 내려주고, body로는 user 정보만 준다.
// (응답 포맷이 { success, data: user } 이므로 data.data 를 꺼낸다)
export const login = async (body: LoginRequest): Promise<User> => {
  const { data } = await axiosInstance.post<ApiResponse<User>>('/auth/login', body);
  return data.data;
};

export const signup = async (body: SignupRequest): Promise<User> => {
  const { data } = await axiosInstance.post<ApiResponse<User>>('/auth/signup', body);
  return data.data;
};

// 현재 로그인한 사용자 조회 — 앱 로드 시 쿠키 세션을 복원하는 용도.
export const getMe = async (): Promise<User> => {
  const { data } = await axiosInstance.get<ApiResponse<User>>('/users/me');
  return data.data;
};

// 로그아웃 — 백엔드가 인증 쿠키를 제거한다.
export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};
