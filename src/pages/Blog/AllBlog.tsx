import { useState, useEffect } from "react";
import { NavbarComponents } from "../../components/Navbar/NavbarComponents";
import { FooterComponent } from "../../components/Footer/FooterComponents";
import BlogCardUser from "../../components/BlogCard/BlogCardUser";
import { blogService } from "../../api/blogServices";
import { BlogType } from "../../type/blog";
import Image from "../../assets/images/PAT.png";
import { LoadingInPage } from "../../components/Loading/LoadingInPage";

const AllBlog = () => {
  const [blog, setBlog] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await blogService.getAllBlog();
        const statusBlog = response.blog.filter(
          (blog) => blog.status === "onpost"
        );
        setBlog(statusBlog);
      } catch (error) {
        console.error("Gagal mengambil:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="relative w-full">
        <NavbarComponents />
      </div>

      <div className="relative pt-5 md:pb-8">
        <div className="flex flex-col pt-10">
          <div className="pt-10">
            <h1
              className="md:text-[60px] text-[40px] font-semibold md:py-5 text-[#0D4883] text-center"
              style={{ fontFamily: "Arlonbold" }}
            >
              Blog
            </h1>
          </div>

          <div className="bg-[#0D4883] relative px-4 pb-10 pt-10 min-h-[300px]">
            {loading ? (
              <div className="flex justify-center items-center h-[200px]">
                <LoadingInPage />
              </div>
            ) : blog.length === 0 ? (
              <p className="text-lg text-center text-white">
                Belum ada blog yang tersedia.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {blog.map((item) => (
                  <BlogCardUser
                    key={item.id}
                    id={item.id}
                    image={
                      item.image
                        ? // `http://127.0.0.1:8000/storage/${item.image}`
                          `https://api-serviceinosustain.com/storage/${item.image}`
                        : Image
                    }
                    title={item.title}
                    content={item.content}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="md:mt-0 p-5 md:p-[40px]">
        <FooterComponent />
      </div>
    </div>
  );
};

export default AllBlog;
