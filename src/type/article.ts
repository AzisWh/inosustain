export interface ArticleType {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image: string | null;
  created_at?: string;
  updated_at?: string;
  verifikasi_admin: 'menunggu' | 'disetujui' | 'ditolak';
  user: {
    id: number;
    nama_depan: string;
    nama_belakang: string;
    email: string;
  };
}

export interface ArticleListResponse {
  message: string;
  artikels: ArticleType[];
}

export interface ArticleResponse {
  message: string;
  artikel: ArticleType;
}

export interface PostArticlePayload {
  title: string;
  content: string;
  image: string | File | null;
}

type VerifikasiAdminStatus = 'menunggu' | 'disetujui' | 'ditolak';

export interface PostArticleAdminPayload {
  title: string;
  content: string;
  image: string | File | null;
  verifikasi_admin: VerifikasiAdminStatus;
}
