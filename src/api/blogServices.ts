import axiosInstance from './axiosInterceptor';
import { BlogResponse, BlogListResponse, PostBlogPayload } from '../type/blog';

export const blogService = {
  async getAllBlog(): Promise<BlogListResponse> {
    const response = await axiosInstance.get('/semuaBlog');
    return response.data;
  },

  async getBlogById(id: number): Promise<BlogResponse> {
    const response = await axiosInstance.get(`/detailBlog/${id}`);
    return response.data;
  },

  async postBlog(payload: PostBlogPayload): Promise<BlogResponse> {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('content', payload.content);

    if (payload.image instanceof File) {
      formData.append('image', payload.image);
    }

    const response = await axiosInstance.post('/postBlogBerita', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  editBlog: async (
    id: string | number,
    data: FormData
  ): Promise<BlogResponse> => {
    const response = await axiosInstance.post(`/editBlog/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteBlog(id: number): Promise<{ message: string }> {
    const response = await axiosInstance.delete(`/deleteBlog/${id}`);
    return response.data;
  },
};
