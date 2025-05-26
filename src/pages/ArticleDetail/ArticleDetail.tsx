import { useParams } from 'react-router-dom';
import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import { FooterComponent } from '../../components/Footer/FooterComponents';
import { useEffect, useState } from 'react';
import { ArticleType } from '../../type/article';
import { articleService } from '../../api/articleServies';
import Image from '../../assets/images/PAT.png';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (id) {
          const res = await articleService.getArticleById(Number(id));
          setArticle(res.artikel);
          // console.log(res.artikel);
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
    return <p className="mt-10 text-center">Memuat detail artikel...</p>;
  if (!article)
    return <p className="mt-10 text-center">Artikel tidak ditemukan.</p>;
  return (
    <div>
      <div className="relative w-full">
        <NavbarComponents />
      </div>
      <div className="max-w-4xl p-6 mx-auto mt-10">
        <img
          src={
            article.image
              ? // ? `http://127.0.0.1:8000/storage/${article.image}`
                `http://api-serviceinosustain.com/storage/${article.image}`
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
          className="leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: article.content }}></div>
      </div>
      <div className=" md:mt-0 p-5 md:p-[40px]">
        <FooterComponent />
      </div>
    </div>
  );
};

export default ArticleDetail;
