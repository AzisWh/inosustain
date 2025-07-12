import { useRef } from 'react';
import { articleService } from '../../../api/articleServies';
import { ArticleType } from '../../../type/article';
import ApiArticle from '../../../components/TESAPI/ApiArticle';
import Image from '../../../assets/images/PAT.png';
import { useState, useEffect } from 'react';

const ArticleHome = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [articles, setArticles] = useState<ArticleType[]>([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getAllArticles();
        const approvedArticles = response.artikels.filter(
          (artikel) => artikel.verifikasi_admin === 'disetujui'
        );

        setArticles(approvedArticles);
        setError(null);
      } catch (err) {
        setError('Gagal mengambil data artikel.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="relative px-4 pb-10">
      <div
        ref={containerRef}
        className="transition-all duration-700 ease-in-out">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 bg-gray-100 border rounded shadow animate-pulse h-52">
                <div className="w-full h-32 mb-2 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-4 mb-1 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-10 text-center text-red-500">{error}</div>
        ) : articles.length === 0 ? (
          <div className="mt-10 text-center text-gray-500">
            Belum ada artikel yang tersedia.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((item) => (
              <ApiArticle
                key={item.id}
                id={item.id}
                image={
                  item.image
                    ? // ? `http://127.0.0.1:8000/storage/${item.image}`
                      `https://api-serviceinosustain.com/storage/${item.image}`
                    : Image
                }
                title={item.title}
                descrip={item.content}
                penulis={`${item.user.nama_depan} ${item.user.nama_belakang}`}
                email={item.user.email}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleHome;
