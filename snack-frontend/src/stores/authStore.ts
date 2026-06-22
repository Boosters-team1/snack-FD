import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/auth';

// 인증 토큰은 httpOnly 쿠키에 있어 JS에서 다루지 않는다.
// 스토어에는 화면 표시용 user 정보만 보관하며, 진짜 로그인 여부의 출처는 쿠키다.
interface AuthState {
  user: User | null;
  setAuth: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setAuth: (user) => set({ user }),
      clearAuth: () => set({ user: null }),
    }),
    { name: 'auth-storage' }
  )
);
