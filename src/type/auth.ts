export type Gender = 'L' | 'P';

export enum RoleType {
  USER = 1,
  ADMIN = 2,
}

export interface RegisterPayload {
  nama_depan: string;
  nama_belakang: string;
  email: string;
  no_hp: string;
  gender: Gender;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserType {
  id: number;
  nama_depan: string;
  nama_belakang: string;
  email: string;
  no_hp: string;
  gender: Gender;
  password: string;
  verification_code?: string | null;
  role_type: RoleType;
}

export interface AuthResponse {
  message: string;
  user: UserType;
  authorization: {
    token: string;
    type: string;
  };
}
