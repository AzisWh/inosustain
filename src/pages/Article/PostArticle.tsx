import { useState, useEffect } from 'react';
import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import { FooterComponent } from '../../components/Footer/FooterComponents';
import { PostArticlePayload } from '../../type/article';
import { articleService } from '../../api/articleServies';
import { toast } from 'react-hot-toast';

const PostArticle = () => {
  const [formData, setFormData] = useState<PostArticlePayload>({
    title: '',
    content: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await articleService.postArticle(formData);
      toast.success(res.message);
      setFormData({ title: '', content: '', image: null });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || 'Terjadi kesalahan saat posting.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative w-full">
        <NavbarComponents />
      </div>
      <div className="pt-10 px-6 md:px-20 bg-[#F3F7FA] min-h-screen">
        <h1 className="text-3xl md:text-5xl font-bold text-[#0D4883] text-center mb-8">
          Post Your Article Here
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-10 rounded-xl shadow-lg max-w-3xl mx-auto space-y-6">
          <div>
            <label className="block font-semibold mb-2 text-[#0D4883]">
              Judul Artikel
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-[#0D4883]">
              Konten Artikel
            </label>
            <textarea
              name="content"
              rows={6}
              value={formData.content}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-[#0D4883]">
              Gambar (opsional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0D4883] hover:bg-[#083160] text-white font-semibold px-8 py-2 rounded-full">
              {loading ? 'Mengirim...' : 'Kirim Artikel'}
            </button>
          </div>
        </form>
      </div>

      <div className=" md:mt-0 p-5 md:p-[40px]">
        <FooterComponent />
      </div>
    </div>
  );
};

export default PostArticle;
