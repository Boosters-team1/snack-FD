export interface User {
  id: number;
  email: string;
  username: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
}

export interface ProfileUpdateRequest {
  username?: string;
  password?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
