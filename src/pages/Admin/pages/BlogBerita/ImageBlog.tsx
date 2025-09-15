import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";
import { BlogImage } from "../../../../type/blog";
import { blogService } from "../../../../api/blogServices";
import toast from "react-hot-toast";
// import { image } from "jodit/esm/plugins/image/image";

const ImageBlog = () => {
  const { id } = useParams<{ id: string }>();
  const [images, setImages] = useState<BlogImage[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchImages = async () => {
    if (id) {
      try {
        const res = await blogService.getBlogImages(Number(id));
        setImages(res.images);
      } catch (err) {
        console.error("Failed to fetch blog images:", err);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, [id]);

  const handleAddImage = () => {
    if (newImages.length < 5) {
      setNewImages([...newImages, new File([], "")]);
    }
  };

  //   update index tertentu
  const handleFileChange = (file: File, index: number) => {
    const updated = [...newImages];
    updated[index] = file;
    setNewImages(updated);
  };

  const handleSubmit = async () => {
    if (!id || newImages.length === 0) return;
    setIsSubmitting(true);
    try {
      const filesToUpload = newImages.filter((f) => f.size > 0);
      if (filesToUpload.length === 0) return;

      await blogService.addBlogImage(Number(id), filesToUpload);
      toast.success("Images berhasil ditambahkan");
      setNewImages([]);
      fetchImages();
    } catch (err) {
      console.error("Failed to upload images:", err);
      toast.error("Gagal mengunggah images");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [deletingImageId, setDeletingImageId] = useState<number | null>(null);

  const handleDelete = async (imageId: number) => {
    setDeletingImageId(imageId);
    try {
      await blogService.deleteBlogImage(imageId);
      toast.success("Gambar berhasil dihapus");
      fetchImages();
    } catch (err) {
      console.error("Failed to delete image:", err);
      toast.error("Gagal menghapus gambar");
    } finally {
      setDeletingImageId(null);
    }
  };
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Blog Images</h1>

        <div>
          <h2 className="mb-3 text-lg font-semibold">
            Image yang sudah ditambahkan
          </h2>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative overflow-hidden border rounded-lg shadow-sm group"
                >
                  <img
                    // src={`http://localhost:8000/storage/${img.image}`}
                    src={`http://api-serviceinosustain.com/storage/${img.image}`}
                    alt={`Blog ${img.id}`}
                    className="object-cover w-full h-40"
                  />
                  <button
                    onClick={() => handleDelete(img.id)}
                    disabled={deletingImageId === img.id}
                    className={`absolute top-2 right-2 px-2 py-1 text-xs rounded bg-red-500 text-white ${
                      deletingImageId === img.id
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-600"
                    }`}
                  >
                    {deletingImageId === img.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Belum ada gambar.</p>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">
            Tambah Image Baru (max 5)
          </h2>
          <div className="space-y-3">
            {newImages.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-2 border rounded-lg"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    handleFileChange(e.target.files[0], index)
                  }
                  className="block w-full text-sm"
                />
                {file && file.size > 0 && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="object-cover w-20 h-20 border rounded"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleAddImage}
              disabled={newImages.length >= 5}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              + Add Image
            </button>
            <button
              disabled={isSubmitting || newImages.length === 0}
              onClick={handleSubmit}
              className={`px-5 py-2 text-sm font-medium rounded-lg transition ${
                isSubmitting
                  ? "bg-blue-600 text-white opacity-50 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ImageBlog;
