import { useState, useEffect } from 'react';
import ApiArticle from '../../components/TESAPI/ApiArticle';
import { articleService } from '../../api/articleServies';
import { ArticleType } from '../../type/article';
import Image from '../../assets/images/PAT.png';

const TestArtikel = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getAllArticles();
        const approvedArticles = response.artikels.filter(
          (artikel) => artikel.verifikasi_admin === 'disetujui'
        );

        setArticles(approvedArticles);
        console.log(approvedArticles);
      } catch (error) {
        console.error('Gagal mengambil data artikel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading artikel...</p>;
  }

  if (articles.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Belum ada artikel yang tersedia.
      </div>
    );
  }

  return (
    <section className="relative px-4 pb-10">
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((item) => (
          <ApiArticle
            key={item.id}
            id={item.id}
            image={
              item.image ? `http://127.0.0.1:8000/storage/${item.image}` : Image
            }
            title={item.title}
            descrip={item.content}
            penulis={`${item.user.nama_depan} ${item.user.nama_belakang}`}
            email={item.user.email}
          />
        ))}
      </div>
    </section>
  );
};

export default TestArtikel;
