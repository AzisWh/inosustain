import axios from 'axios';
import { store } from '../redux/store';
import { authService } from './authServices';
import { setToken, logout } from '../redux/auth/authSlice';

let navigateToLogin: (() => void) | null = null;

export const setNavigateToLogin = (fn: () => void) => {
  navigateToLogin = fn;
};

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/login')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await authService.refreshToken();
        console.log('Refresh token berhasil:', refreshResponse);
        const newToken = refreshResponse.authorization.token;

        store.dispatch(setToken(newToken));
        localStorage.setItem('token', newToken);

        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newToken}`;
        processQueue(null, newToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token gagal:', refreshError);
        console.log('Akan logout user');
        processQueue(refreshError, null);

        await authService.logout();
        localStorage.removeItem('token');
        store.dispatch(logout());

        if (navigateToLogin) {
          navigateToLogin();
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
