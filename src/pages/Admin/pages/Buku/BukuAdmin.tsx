import { useEffect, useState } from 'react';
import Layout from '../../layout/Layout';
import { BukuService } from '../../../../api/bukuService';
import { BukuType } from '../../../../type/buku';
import BukuCard from '../../components/BukuCard/BukuCard';
import toast from 'react-hot-toast';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

const BukuAdmin = () => {
  const [buku, setBuku] = useState<BukuType[]>([]);
  useEffect(() => {
    const fetchBuku = async () => {
      try {
        const response = await BukuService.getAllBuku();
        setBuku(response.buku);
        // console.log(response.buku);
      } catch (error) {
        console.log('gagal memuat buku:', error);
      }
    };
    fetchBuku();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    penerbit: '',
    tahun: '',
    doi: '',
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, file });

    if (file && file.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(file);
      setPdfPreview(fileURL);
    } else {
      setPdfPreview(null);
    }
  };

  const handleAdd = async () => {
    setIsSubmitting(true);
    try {
      await BukuService.postBuku(formData);
      setShowModal(false);
      const response = await BukuService.getAllBuku();
      setBuku(response.buku);
      setPdfPreview(null);
      toast.success('Buku berhasil ditambahkan');
    } catch (error) {
      console.error('Gagal menambahkan buku:', error);
      toast.error('Terjadi kesalahan saat menambahkan buku');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Layout>
        <div className="mt-6">
          <div className="">
            {buku.length === 0 ? (
              <div className="mt-10 text-center text-gray-500">
                Belum ada buku yang tersedia.
              </div>
            ) : null}
            <div className="flex flex-col items-center justify-center w-full h-screen">
              <div className="flex flex-col">
                <div className="flex items-center justify-between px-4 py-4 md:px-10">
                  <h1
                    className="md:text-[60px] text-[40px] font-semibold text-[#0D4883]"
                    style={{ fontFamily: 'Arlonbold' }}>
                    List Buku
                  </h1>
                  <button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="px-4 py-2 text-white bg-[#0D4883] rounded hover:bg-blue-700">
                    Tambah Buku
                  </button>
                </div>
                <div className="bg-[#0D4883] relative px-4 pb-10 pt-10">
                  <div className="grid gap-6 md:grid-cols-3">
                    {buku.map((item) => (
                      <div key={item.id} className="relative">
                        <BukuCard
                          id={item.id}
                          title={item.title}
                          author={item.author}
                          penerbit={item.penerbit}
                          tahun={item.tahun}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>Tambah Buku</ModalHeader>
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
              <label className="block mb-1 font-semibold">Author</label>
              <input
                name="author"
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Penerbit</label>
              <input
                name="penerbit"
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={formData.penerbit}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Tahun Terbit</label>
              <input
                name="tahun"
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={formData.tahun}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">DOI</label>
              <input
                name="doi"
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={formData.doi}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">
                File Buku (PDF)
              </label>
              <input
                type="file"
                name="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* PDF Preview */}
            {pdfPreview && (
              <div className="mt-6">
                <h2 className="mb-2 text-xl font-semibold">Preview Buku:</h2>
                <iframe
                  src={pdfPreview}
                  title="PDF Preview"
                  width="100%"
                  height="400px"
                  className="border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleAdd}
            className={`px-6 py-3 text-white rounded-full bg-blue-600 hover:bg-blue-700 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button
            type="button"
            className="px-6 py-3 text-black bg-gray-300 rounded-full"
            onClick={() => {
              setShowModal(false);
              setFormData({
                title: '',
                author: '',
                penerbit: '',
                tahun: '',
                doi: '',
                file: null,
              });
              setPdfPreview(null);
            }}>
            Batal
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default BukuAdmin;
