import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import { useEffect, useState } from "react";
import { BlogType } from "../../../../type/blog";
import { blogService } from "../../../../api/blogServices";
import Image from "../../../../assets/images/PAT.png";
const DetailBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (id) {
          const res = await blogService.getBlogById(Number(id));
          setBlog(res.blog);
        }
      } catch (error) {
        console.error("Gagal mengambil detail artikel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading)
    return <p className="mt-10 text-center">Memuat detail Blog...</p>;
  if (!blog) return <p className="mt-10 text-center">Blog tidak ditemukan.</p>;

  return (
    <Layout>
      <div className="max-w-4xl p-6 mx-auto mt-10">
        <img
          src={
            blog.image ? `http://127.0.0.1:8000/storage/${blog.image}` : Image
          }
          alt={blog.title}
          className="w-full h-[300px] object-contain mb-4"
        />
        <h1 className="text-3xl font-bold text-[#0D4883] mt-2 mb-4">
          {blog.title}
        </h1>

        <div
          className="leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
    </Layout>
  );
};

export default DetailBlog;
