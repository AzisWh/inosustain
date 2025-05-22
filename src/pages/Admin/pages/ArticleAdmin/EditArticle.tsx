import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { articleService } from '../../../../api/articleServies';
import toast from 'react-hot-toast';
import { ArticleResponse } from '../../../../type/article';
import Layout from '../../layout/Layout';
import { User } from '../../../../type/user';
import { userService } from '../../../../api/userMenejServices';

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [verifikasi_admin, setVerifikasi_admin] = useState('menunggu');
  const [image, setImage] = useState<File | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [artikel, setArtikel] = useState<ArticleResponse>({
    message: '',
    artikel: {
      id: 0,
      user_id: 0,
      title: '',
      content: '',
      image: null,
      verifikasi_admin: 'menunggu',
      user: { id: 0, nama_depan: '', nama_belakang: '', email: '' },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await articleService.getArticleById(Number(id));
          setArtikel(artikel);
          setTitle(response.artikel.title);
          setContent(response.artikel.content);
          setVerifikasi_admin(response.artikel.verifikasi_admin);
          setUserId(response.artikel.user_id);

          if (response.artikel.image) {
            setImagePreview(
              `http://127.0.0.1:8000/storage/${response.artikel.image}`
            );
          }
        }

        const userList = await userService.getAllUsers();
        setUsers(userList.data);
      } catch (error) {
        toast.error('Gagal memuat data');
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('verifikasi_admin', verifikasi_admin);
    if (userId) formData.append('user_id', String(userId));
    if (image) formData.append('image', image);

    try {
      const res = await articleService.editArticle(Number(id), formData);
      setArtikel(res);
      toast.success(res.message);
      navigate('/article-admin');
    } catch (error: any) {
      console.error(
        'Gagal memperbarui artikel:',
        error.response?.data || error.message
      );
      toast.error(
        `Gagal memperbarui artikel: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Edit Artikel
        </h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700">
              Judul Artikel
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Masukkan judul artikel"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-700">
              Konten Artikel
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Masukkan konten artikel"></textarea>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-700">
              Status Verifikasi
            </label>
            <select
              id="status"
              value={verifikasi_admin}
              onChange={(e) => setVerifikasi_admin(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300">
              <option value="menunggu">Menunggu</option>
              <option value="disetujui">Disetujui</option>
              <option value="ditolak">Ditolak</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="user_id"
              className="block mb-2 text-sm font-medium text-gray-700">
              Penulis
            </label>
            <select
              id="user_id"
              value={userId ?? ''}
              onChange={(e) => setUserId(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              required>
              <option value="">Pilih penulis</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.nama_depan} - {user.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-700">
              Upload Gambar
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImage(file ?? null);
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                } else {
                  setImagePreview(null);
                }
              }}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-gray-100 file:text-sm file:font-semibold hover:file:bg-gray-200"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover h-48 mt-4 border rounded-md"
              />
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditArticle;
