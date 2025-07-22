import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogService } from "../../api/blogServices";
import { BlogType } from "../../type/blog";
import { NavbarComponents } from "../../components/Navbar/NavbarComponents";
import { FooterComponent } from "../../components/Footer/FooterComponents";

const DetailBlogUser = () => {
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

  return (
    <>
      <NavbarComponents />

      <div className="max-w-4xl min-h-screen p-6 pt-10 mx-auto">
        {loading ? (
          <p className="mt-10 text-center">Memuat detail Blog...</p>
        ) : !blog ? (
          <p className="mt-10 text-center">Blog tidak ditemukan.</p>
        ) : (
          <div className="mt-10">
            <h1 className="mb-4 text-3xl font-bold">{blog.title}</h1>
            <img
              src={
                blog.image
                  ? // ? `http://127.0.0.1:8000/storage/${blog.image}`
                    `https://api-serviceinosustain.com/storage/${blog.image}`
                  : "/default-image.jpg"
              }
              alt={blog.title}
              className="w-full h-auto max-h-[400px] object-cover mb-4 rounded-xl mx-auto"
            />
            <p className="text-justify text-gray-700 whitespace-pre-line">
              {blog.content}
            </p>
          </div>
        )}
      </div>

      <FooterComponent />
    </>
  );
};

export default DetailBlogUser;
