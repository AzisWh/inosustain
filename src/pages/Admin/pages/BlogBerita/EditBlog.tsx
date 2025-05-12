import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { blogService } from '../../../../api/blogServices';
import toast from 'react-hot-toast';
import { BlogResponse } from '../../../../type/blog';
import Layout from '../../layout/Layout';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('onhold');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [blog, setBlog] = useState<BlogResponse>({
    message: '',
    blog: {
      id: 0,
      title: '',
      content: '',
      image: null,
      status: 'onhold',
      user: { id: 0, nama_depan: '', nama_belakang: '', email: '' },
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (id) {
          const res = await blogService.getBlogById(Number(id));
          setBlog(blog);
          setTitle(res.blog.title);
          setContent(res.blog.content);
          setStatus(res.blog.status);
          if (res.blog.image) {
            setImagePreview(`http://localhost:8000/storage/${res.blog.image}`);
          }
        }
      } catch (error) {
        console.error('Gagal mengambil detail blog:', error);
        toast.error('Gagal mengambil detail blog');
      }
    };

    fetchDetail();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('status', status);

    if (image && typeof image !== 'string') {
      formData.append('image', image);
    }

    try {
      const res = await blogService.editBlog(Number(id), formData);
      setBlog(res);
      toast.success('Blog berhasil diperbarui!');
      navigate('/blog-admin');
      window.location.reload();
    } catch (error) {
      console.error('Gagal update:', error);
      toast.error('Gagal memperbarui blog');
    }
  };

  return (
    <Layout>
      <div className="max-w-xl p-4 mx-auto">
        <h1 className="mb-4 text-xl font-bold">Edit Blog</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 mb-2 border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="w-full p-2 mb-2 border"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'onhold' | 'onpost')}
            className="w-full p-2 mb-2 border">
            <option value="onhold">On Hold</option>
            <option value="onpost">On Post</option>
          </select>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full mb-2 rounded"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mb-2"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded">
            Simpan
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditBlog;
