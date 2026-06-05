export interface JwtUser {
  id: number;
  email: string;
  name: string;
  companyName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePasswordRequest {
  password: string;
  passwordConfirm: string;
}