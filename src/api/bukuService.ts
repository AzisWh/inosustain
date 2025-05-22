import axiosInstance from './axiosInterceptor';
import { BukuListResponse, BukuResponse, PostBukuPayload } from '../type/buku';

export const BukuService = {
  async getAllBuku(): Promise<BukuListResponse> {
    const response = await axiosInstance.get('/semuaBuku');
    return response.data;
  },

  async getBukuById(id: Number): Promise<BukuResponse> {
    const response = await axiosInstance.get(`/detailBuku/${id}`);
    return response.data;
  },

  async postBuku(payload: PostBukuPayload): Promise<BukuResponse> {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('author', payload.author);
    formData.append('tahun', payload.tahun);
    formData.append('penerbit', payload.penerbit);
    formData.append('doi', payload.doi);

    if (payload.file instanceof File) {
      formData.append('file', payload.file);
    }

    const response = await axiosInstance.post('/addBuku', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
