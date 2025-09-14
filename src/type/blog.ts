export interface BlogType {
  id: number;
  title: string;
  content: string;
  image: string | File | null;
  created_at?: string;
  updated_at?: string;
  status: 'onhold' | 'onpost';
  user: {
    id: number;
    nama_depan: string;
    nama_belakang: string;
    email: string;
  };
  images: {
    id: number;
    blog_id: number;
    image: string;
    created_at?: string;
    updated_at?: string;
  }[] ;
}

export interface BlogImage {
  id: number;
  blog_id: number;
  image: string;
  created_at: string;
  updated_at: string;
}


export interface BlogListResponse {
  message: string;
  blog: BlogType[];
}

export interface BlogResponse {
  message: string;
  blog: BlogType;
}

export interface PostBlogPayload {
  title: string;
  content: string;
  image: string | File | null;
}

export interface EditBlogPayload {
  title: string;
  content: string;
  image: string | File | null;
  status: 'onhold' | 'onpost';
}


export interface AddBlogImagePayload {
  blogId: number;
  images: File[];
}

export interface AddBlogImageResponse {
  message: string;
  blog: BlogType;
}

export interface BlogImageResponse {
  message: string;
  images: BlogImage[];
}