import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";
import { BlogImage } from "../../../../type/blog";
import { blogService } from "../../../../api/blogServices";
import toast from "react-hot-toast";

const ImageBlog = () => {
  const { id } = useParams<{ id: string }>();
  const [images, setImages] = useState<BlogImage[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

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
    }
  };
  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">Blog Images</h1>
      <h1>image yang sudah ditambahkan</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.length > 0 ? (
          images.map((img) => (
            <div key={img.id} className="p-2 border rounded">
              <img
                src={`http://localhost:8000/storage/${img.image}`}
                alt={`Blog ${img.id}`}
                className="object-cover w-full h-40 rounded"
              />
            </div>
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
      <h2 className="mb-2 font-semibold">Tambah Image Baru (max 5):</h2>
      <div className="space-y-3">
        {newImages.map((file, index) => (
          <div key={index} className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] &&
                handleFileChange(e.target.files[0], index)
              }
              className="block w-full"
            />
            {/* Preview */}
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
          className="px-4 py-2 text-white bg-blue-600 rounded disabled:bg-gray-400"
        >
          + Add Image
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-white bg-green-600 rounded"
        >
          Simpan
        </button>
      </div>

      {/* <div>
        <EditorComponent />
      </div> */}
    </Layout>
  );
};

export default ImageBlog;
