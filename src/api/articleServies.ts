import axiosInstance from './axiosInterceptor';
import {
  ArticleResponse,
  ArticleListResponse,
  PostArticlePayload,
} from '../type/article';

export const articleService = {
  async getAllArticles(): Promise<ArticleListResponse> {
    const response = await axiosInstance.get('/semuaArtikel');
    return response.data;
  },

  async getArticleById(id: number): Promise<ArticleResponse> {
    const response = await axiosInstance.get(`/detailArtikel/${id}`);
    return response.data;
  },

  async postArticle(payload: PostArticlePayload): Promise<ArticleResponse> {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('content', payload.content);

    if (payload.image instanceof File) {
      formData.append('image', payload.image);
    }

    const response = await axiosInstance.post('/postArtikel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};
