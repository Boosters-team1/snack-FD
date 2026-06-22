import { useAuthStore } from '../stores/authStore';

export function useAuth() {
  const { user, accessToken, setAuth, clearAuth } = useAuthStore();
  return {
    user,
    isLoggedIn: !!accessToken,
    setAuth,
    logout: clearAuth,
  };
}
