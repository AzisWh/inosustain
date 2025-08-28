import Layout from "../../layout/Layout";
import { useState, useEffect } from "react";
import Image from "../../../../assets/images/PAT.png";
import { articleService } from "../../../../api/articleServies";
import { ArticleType, PostArticleAdminPayload } from "../../../../type/article";
import ArticleCardDashboard from "../../components/ArticleCard/ArticleCard";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import toast from "react-hot-toast";
import { Button } from "../../../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const ArticleAdmin = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getAllArticles();

        setArticles(response.artikels);
        // console.log(response.artikels);
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
      }
    };

    fetchArticles();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PostArticleAdminPayload>({
    title: "",
    content: "",
    image: null,
    verifikasi_admin: "menunggu" as const,
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
      const res = await articleService.postArticleAdmin(formData);
      toast.success(res.message);
      setFormData({
        title: "",
        content: "",
        image: null,
        verifikasi_admin: "menunggu",
      });
      setShowModal(false);
      window.location.reload();
      toast.success("Berhasil membuat artikel!");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Terjadi kesalahan saat posting.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);

  const handleDelete = async () => {
    if (!articleToDelete) return;

    try {
      await articleService.deleteArticle(articleToDelete);
      toast.success("Blog berhasil dihapus");
      setArticles((prev) => prev.filter((item) => item.id !== articleToDelete));
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Terjadi kesalahan saat menghapus blog.";
      toast.error(msg);
    } finally {
      setShowDeleteModal(false);
      setArticleToDelete(null);
    }
  };

  return (
    <>
      <Layout>
        <div className="mt-6">
          <div className="">
            {articles.length === 0 ? (
              <div className="mt-10 text-center text-gray-500">
                Belum ada artikel yang tersedia.
              </div>
            ) : null}
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 md:px-10">
                <h1
                  className="md:text-[60px] text-[40px] font-semibold text-[#0D4883]"
                  style={{ fontFamily: "Arlonbold" }}
                >
                  List Article
                </h1>
                <button
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="px-4 py-2 text-white bg-[#0D4883] rounded hover:bg-blue-700"
                >
                  Tambah Article
                </button>
              </div>
              <div className="bg-[#0D4883] relative px-4 pb-10 pt-10">
                <div className="grid gap-6 md:grid-cols-3">
                  {articles.map((item) => (
                    <div key={item.id} className="relative">
                      <ArticleCardDashboard
                        id={item.id}
                        image={
                          item.image
                            ? // ? `http://127.0.0.1:8000/storage/${item.image}`
                              `https://api-serviceinosustain.com/storage/${item.image}`
                            : Image
                        }
                        title={item.title}
                        verifikasi_admin={item.verifikasi_admin}
                        descrip={item.content}
                        penulis={`${item.user.nama_depan} ${item.user.nama_belakang}`}
                        email={item.user.email}
                      />
                      <div className="absolute flex space-x-2 top-2 right-2">
                        <button
                          onClick={() => {
                            setArticleToDelete(item.id);
                            setShowDeleteModal(true);
                          }}
                          className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                        >
                          hapus
                        </button>
                        <button
                          onClick={() => navigate(`/edit-Artikel/${item.id}`)}
                          className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                          Edit Artikel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>Add Article</ModalHeader>
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
              <textarea
                className="w-full px-3 py-2 border rounded"
                name="content"
                rows={6}
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">
                Status Verifikasi
              </label>
              <select
                value={formData.verifikasi_admin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    verifikasi_admin: e.target.value as
                      | "menunggu"
                      | "disetujui"
                      | "ditolak",
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="menunggu">Menunggu</option>
                <option value="disetujui">Disetujui</option>
                <option value="ditolak">Ditolak</option>
              </select>
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
    </>
  );
};

export default ArticleAdmin;
