import Layout from "../../layout/Layout";
import { useState, useEffect } from "react";
import Image from "../../../../assets/images/PAT.png";
import { blogService } from "../../../../api/blogServices";
import { BlogType, PostBlogPayload } from "../../../../type/blog";
import BlogCard from "../../components/BlogCard/BlogCard";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Button } from "../../../../components/Button/Button";
import EditorComponent from "../../components/EditorComponent/EditorComponent";
import toast from "react-hot-toast";

const BlogBerita = () => {
  const [blog, setBlog] = useState<BlogType[]>([]);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogService.getAllBlog();
        setBlog(response.blog);
      } catch (error) {
        console.log("gagal memuat blog:", error);
      }
    };

    fetchBlog();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PostBlogPayload>({
    title: "",
    content: "",
    image: null,
  });

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

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const res = await blogService.postBlog(formData);
      toast.success(res.message);
      setFormData({ title: "", content: "", image: null });
      setShowModal(false);
      window.location.reload();
      toast.success("Berhasil membuat blog!");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Terjadi kesalahan saat posting.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);

  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      await blogService.deleteBlog(blogToDelete);
      toast.success("Blog berhasil dihapus");
      setBlog((prev) => prev.filter((item) => item.id !== blogToDelete));
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Terjadi kesalahan saat menghapus blog.";
      toast.error(msg);
    } finally {
      setShowDeleteModal(false);
      setBlogToDelete(null);
    }
  };
  return (
    <Layout>
      <div className="mt-6">
        <div className="">
          {blog.length === 0 ? (
            <div className="mt-10 text-center text-gray-500">
              Belum ada blog yang tersedia.
            </div>
          ) : null}
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 md:px-10">
              <h1
                className="md:text-[60px] text-[40px] font-semibold text-[#0D4883]"
                style={{ fontFamily: "Arlonbold" }}
              >
                List Blog
              </h1>
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="px-4 py-2 text-white bg-[#0D4883] rounded hover:bg-blue-700"
              >
                Tambah Blog
              </button>
            </div>
            <div className="bg-[#0D4883] relative px-4 pb-10 pt-10">
              <div className="grid gap-6 md:grid-cols-3">
                {blog.map((item) => (
                  <div key={item.id} className="relative">
                    <BlogCard
                      id={item.id}
                      image={
                        item.image
                          ? //  `http://127.0.0.1:8000/storage/${item.image}`
                            `http://api-serviceinosustain.com/storage/${item.image}`
                          : Image
                      }
                      title={item.title}
                      status={item.status}
                      // content={item.content}
                    />
                    <button
                      onClick={() => {
                        setBlogToDelete(item.id);
                        setShowDeleteModal(true);
                      }}
                      className="absolute px-3 py-1 text-sm text-white bg-red-600 rounded top-2 right-2 hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>Edit Blog</ModalHeader>
        <ModalBody className="!bg-white">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Judul</label>
              <input
                name="title"
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">
                Image (Opsional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Konten</label>
              <EditorComponent
                value={formData.content}
                onChange={(val) => setFormData({ ...formData, content: val })}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            disabled={isSubmitting}
            className={`px-6 py-3 md:text-[14px] text-sm font-medium rounded-full duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            } bg-blue-600 text-white hover:bg-blue-700`}
            onClick={handleAdd}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
          <Button
            type="button"
            text="Batal"
            className="text-black bg-gray-300"
            onClick={() => setShowModal(false)}
          />
        </ModalFooter>
      </Modal>

      {/* delete */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalHeader>Konfirmasi Hapus</ModalHeader>
        <ModalBody className="!bg-white">
          <p>Apakah kamu yakin ingin menghapus blog ini?</p>
        </ModalBody>
        <ModalFooter>
          <button
            className="px-6 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            onClick={handleDelete}
          >
            Ya, Hapus
          </button>
          <Button
            text="Batal"
            onClick={() => setShowDeleteModal(false)}
            className="text-black bg-gray-300"
          />
        </ModalFooter>
      </Modal>
    </Layout>
  );
};

export default BlogBerita;
