import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleType } from '../../type/article';
import { articleService } from '../../api/articleServies';
import Image from '../../assets/images/PAT.png';

const TestDetailArtikel = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (id) {
          const res = await articleService.getArticleById(Number(id));
          setArticle(res.artikel);
          console.log(res.artikel);
        }
      } catch (error) {
        console.error('Gagal mengambil detail artikel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Memuat detail artikel...</p>;
  if (!article)
    return <p className="text-center mt-10">Artikel tidak ditemukan.</p>;
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <img
        src={
          article.image
            ? `https://788a-140-213-169-54.ngrok-free.app/api/${article.image}`
            : Image
        }
        alt={article.title}
        className="w-full h-[300px] object-contain mb-4"
      />
      <p className="text-sm text-gray-500">
        {article.user.nama_depan} {article.user.nama_belakang} -{' '}
        {article.user.email}
      </p>
      <h1 className="text-3xl font-bold text-[#0D4883] mt-2 mb-4">
        {article.title}
      </h1>

      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}></div>
    </div>
  );
};

export default TestDetailArtikel;
