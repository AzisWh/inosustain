import Layout from '../../layout/Layout';
import ArticleCardDashboard from '../../components/ArticleCard/ArticleCard';
import { articleService } from '../../../../api/articleServies';
import { useState, useEffect } from 'react';
import { ArticleType } from '../../../../type/article';
import Image from '../../../../assets/images/PAT.png';

const UpdateArticle = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getAllArticles();
        const approvedArticles = response.artikels.filter(
          (artikel) => artikel.verifikasi_admin === 'menunggu'
        );

        setArticles(approvedArticles);
        // console.log(approvedArticles);
      } catch (error) {
        console.error('Gagal mengambil data artikel:', error);
      }
    };
    fetchArticles();
  }, []);
  return (
    <Layout>
      <div className="mt-6">
        <div className="">
          {articles.length === 0 ? (
            <div className="mt-10 text-center text-gray-500">
              Belum ada artikel yang tersedia.
            </div>
          ) : null}
          <div className="flex flex-col">
            <div className="">
              <h1
                className="md:text-[60px] text-[40px] font-semibold  text-[#0D4883] text-center"
                style={{ fontFamily: 'Arlonbold' }}>
                Article
              </h1>
              <p className="pb-4 text-sm font-light text-center text-gray-700">
                List Artikel dengan status menunggu
              </p>
            </div>
            <div className="bg-[#0D4883] relative px-4 pb-10 pt-10">
              <div className="grid gap-6 md:grid-cols-3">
                {articles.map((item) => (
                  <ArticleCardDashboard
                    key={item.id}
                    id={item.id}
                    image={
                      item.image
                        ? // ? `http://127.0.0.1:8000/storage/${item.image}`
                          `http://api-serviceinosustain.com/storage/${item.image}`
                        : Image
                    }
                    verifikasi_admin={item.verifikasi_admin}
                    title={item.title}
                    descrip={item.content}
                    penulis={`${item.user.nama_depan} ${item.user.nama_belakang}`}
                    email={item.user.email}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateArticle;
