import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { BukuType } from '../../../../type/buku';
import { BukuService } from '../../../../api/bukuService';
const BukuDetail = () => {
  const { id } = useParams();
  const [buku, setBuku] = useState<BukuType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (id) {
          const res = await BukuService.getBukuById(Number(id));
          setBuku(res.buku);
        }
      } catch (error) {
        console.error('Gagal mengambil detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading)
    return <p className="mt-10 text-center">Memuat detail Blog...</p>;
  if (!buku) return <p className="mt-10 text-center">Blog tidak ditemukan.</p>;

  return (
    <Layout>
      <div className="max-w-4xl px-4 py-10 mx-auto">
        <h1 className="text-3xl font-bold text-[#0D4883]">{buku.title}</h1>
        <p className="mt-2 text-gray-600">Author: {buku.author}</p>
        <p className="text-gray-600">Penerbit: {buku.penerbit}</p>
        <p className="text-gray-600">Tahun: {buku.tahun}</p>
        <p className="text-gray-600">DOI: {buku.doi}</p>

        {buku.file && (
          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">Preview Buku:</h2>
            <iframe
              src={`http://127.0.0.1:8000${buku.file}`}
              title="PDF Viewer"
              width="100%"
              height="600px"
              className="border border-gray-300 rounded"></iframe>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BukuDetail;
