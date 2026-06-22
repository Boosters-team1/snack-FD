export interface User {
  email: string;
  companyName: string | null;
  name: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileUpdateRequest {
  companyName?: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
}

// 백엔드 공통 응답 포맷: { success, data, message? }
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
