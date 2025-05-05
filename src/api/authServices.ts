import axiosInstance from './axiosInterceptor';
import {
  AuthResponse,
  UserType,
  RegisterPayload,
  LoginPayload,
} from '../type/auth';

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await axiosInstance.post('/login', payload);
    return response.data;
  },

  async register(
    payload: RegisterPayload
  ): Promise<{ message: string; user: UserType; role: string }> {
    const response = await axiosInstance.post('/register', payload);
    return response.data;
  },

  async logout(): Promise<{ message: string }> {
    const response = await axiosInstance.post('/logout');
    return response.data;
  },

  async refreshToken(): Promise<AuthResponse> {
    const response = await axiosInstance.post('/refresh');
    return response.data;
  },

  async getProfile(): Promise<{ message: string; user: UserType }> {
    const response = await axiosInstance.get('/me');
    return response.data;
  },
};
