import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  // 인증은 백엔드가 내려주는 httpOnly 쿠키로 처리된다.
  // 모든 요청에 쿠키를 함께 보내려면 withCredentials가 반드시 필요하다.
  withCredentials: true,
});

// 토큰은 httpOnly 쿠키라 JS로 읽을 수 없고, 백엔드도 Authorization 헤더가 아닌
// 쿠키를 읽으므로 요청 인터셉터에서 Bearer 헤더를 붙이지 않는다.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
