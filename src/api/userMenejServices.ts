import axiosInstance from './axiosInterceptor';
import { User, UserResponse } from '../type/user';

export const userService = {
  async getAllUsers(): Promise<UserResponse<User[]>> {
    const response = await axiosInstance.get<UserResponse<User[]>>('/allUsers');
    return response.data;
  },

  async getUserById(id: number): Promise<UserResponse<User>> {
    const response = await axiosInstance.get<UserResponse<User>>(
      `/detailUsers/${id}`
    );
    return response.data;
  },
};
