export interface BukuType {
  id: number;
  title: string;
  author: string;
  penerbit: string;
  tahun: string;
  doi: string;
  file: File | string | null;
}

export interface BukuListResponse {
  message: string;
  buku: BukuType[];
}

export interface BukuResponse {
  message: string;
  buku: BukuType;
}

export interface PostBukuPayload {
  title: string;
  author: string;
  penerbit: string;
  tahun: string;
  doi: string;
  file: File | string | null;
}
