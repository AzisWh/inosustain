import axios, { AxiosError } from 'axios';
import { store } from '../redux/store';
import { authService } from './authServices';
import { setToken, logout } from '../redux/auth/authSlice';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

let navigateToLogin: (() => void) | null = null;

export const setNavigateToLogin = (fn: () => void) => {
  navigateToLogin = fn;
};

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_NGROK_URL,
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "http://localhost:8000/api",
});

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (isTokenExpired(token)) {
        console.log('Token kadaluarsa terdeteksi sebelum request');
        try {
          await authService.logout();
          console.log('Logout berhasil');
        } catch (logoutError) {
          console.error('Gagal logout:', logoutError);
        }
        localStorage.removeItem('token');
        store.dispatch(logout());
        if (navigateToLogin) {
          toast.error('Sesi Anda telah kadaluarsa. Silakan login kembali.');
          navigateToLogin();
        }
        return Promise.reject(new Error('Token has expired'));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/login')
    ) {
      console.log('Menerima 401, mencoba refresh token...');
      originalRequest._retry = true;

      try {
        const refreshResponse = await authService.refreshToken();
        console.log('Refresh token berhasil:', refreshResponse);
        const newToken = refreshResponse.authorization.token;

        store.dispatch(setToken(newToken));
        localStorage.setItem('token', newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const errorDetails = refreshError as AxiosError;
        console.error(
          'Refresh token gagal:',
          errorDetails.response?.data || errorDetails.message
        );
        try {
          await authService.logout();
          console.log('Logout berhasil');
        } catch (logoutError) {
          console.error('Gagal logout:', logoutError);
        }

        localStorage.removeItem('token');
        store.dispatch(logout());

        if (navigateToLogin) {
          console.log('Mengalihkan ke halaman login...');
          navigateToLogin();
        } else {
          console.error('navigateToLogin tidak diatur!');
        }

        return Promise.reject(refreshError);
      }
    }

    console.error('Error API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
