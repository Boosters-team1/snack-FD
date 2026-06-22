import { useAuthStore } from '../stores/authStore';
import { logout as logoutApi } from '../api/auth';

export function useAuth() {
  const { user, setAuth, clearAuth } = useAuthStore();

  const logout = async () => {
    try {
      await logoutApi(); // 서버에서 인증 쿠키 제거
    } finally {
      clearAuth(); // 서버 호출 실패와 무관하게 로컬 상태는 비운다
    }
  };

  return {
    user,
    isLoggedIn: !!user,
    setAuth,
    logout,
  };
}
