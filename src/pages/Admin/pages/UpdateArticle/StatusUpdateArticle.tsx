import Layout from '../../layout/Layout';
import { articleService } from '../../../../api/articleServies';
import { useState, useEffect } from 'react';
import { ArticleType } from '../../../../type/article';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const StatusUpdateArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [verifikasi_admin, setVerifikasi_admin] = useState<
    'disetujui' | 'ditolak' | ''
  >('');
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(false);

  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      try {
        const res = await articleService.getArticleById(Number(id));
        setArticle(res.artikel);
      } catch (error) {
        setArticle(null);
        toast.error('Artikel tidak ditemukan.');
        console.error(error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !verifikasi_admin) {
      return toast.error('Status wajib dipilih!');
    }

    setLoading(true);
    try {
      await articleService.updateStatusArticle(Number(id), verifikasi_admin);
      toast.success('Status artikel berhasil diperbarui!');
      setVerifikasi_admin('');
      navigate('/article-admin');
    } catch (error) {
      toast.error('Gagal memperbarui status artikel.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="max-w-md p-6 mx-auto mt-10 bg-white border rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">Update Status Artikel</h2>

          {article ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 mt-2 text-sm border rounded bg-gray-50">
                <p>
                  <strong>Judul:</strong> {article.title}
                </p>
                <p>
                  <strong>Status saat ini:</strong>{' '}
                  <span
                    className={`font-semibold ${
                      article.verifikasi_admin === 'disetujui'
                        ? 'text-green-600'
                        : article.verifikasi_admin === 'ditolak'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}>
                    {article.verifikasi_admin}
                  </span>
                </p>
                <p>
                  <strong>Penulis:</strong> {article.user.nama_depan}{' '}
                  {article.user.nama_belakang}
                </p>
                <p className="mt-2">
                  <strong>Konten:</strong>
                  <br />
                </p>
                <p>{stripHtml(article.content)}</p>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block mb-1 text-sm font-medium">
                  Status Baru
                </label>
                <select
                  id="status"
                  value={verifikasi_admin}
                  onChange={(e) =>
                    setVerifikasi_admin(
                      e.target.value as 'disetujui' | 'ditolak'
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required>
                  <option value="">-- Pilih Status --</option>
                  <option value="disetujui">Disetujui</option>
                  <option value="ditolak">Ditolak</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full p-2 text-white rounded transition 
                ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}>
                {loading ? 'Memproses...' : 'Update Status'}
              </button>
            </form>
          ) : (
            <p className="text-center text-gray-500">Memuat artikel...</p>
          )}
        </div>
      </Layout>
    </>
  );
};

export default StatusUpdateArticle;
