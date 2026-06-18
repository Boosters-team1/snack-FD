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

export interface AuthResponse {
  accessToken: string;
}
