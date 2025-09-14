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
          setBlog({ ...res.blog, images: res.blog.images ?? [] });
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

        <div className="mt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {blog.images.length > 0 ? (
              blog.images.map((img: any) => (
                <img
                  key={img.id}
                  src={
                    img.image
                      ? // ? `http://127.0.0.1:8000/storage/${img.image}`
                        `https://api-serviceinosustain.com/storage/${img.image}`
                      : "/default-image.jpg"
                  }
                  alt={`Blog image ${img.id}`}
                  className="object-cover w-full h-40 rounded-lg"
                />
              ))
            ) : (
              <span className="col-span-4 text-center text-gray-400">
                Tidak ada gambar tambahan
              </span>
            )}
          </div>
        </div>

        <div
          className="leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
    </Layout>
  );
};

export default DetailBlog;
