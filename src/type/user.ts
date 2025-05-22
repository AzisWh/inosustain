export interface User {
  id: number;
  nama_depan: string;
  nama_belakang: string;
  email: string;
  role_type: number;
}

export interface UserResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
