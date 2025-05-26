import { useState, useEffect } from 'react';
import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import { FooterComponent } from '../../components/Footer/FooterComponents';
import ApiArticle from '../../components/TESAPI/ApiArticle';
import { articleService } from '../../api/articleServies';
import { ArticleType } from '../../type/article';
import Image from '../../assets/images/PAT.png';

const AllArticle = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getAllArticles();
        const approvedArticles = response.artikels.filter(
          (artikel) => artikel.verifikasi_admin === 'disetujui'
        );

        setArticles(approvedArticles);
        // console.log(approvedArticles);
      } catch (error) {
        console.error('Gagal mengambil data artikel:', error);
      }
    };

    fetchArticles();
  }, []);

  if (articles.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Belum ada artikel yang tersedia.
      </div>
    );
  }
  return (
    <div>
      <div className="relative w-full">
        <NavbarComponents />
      </div>
      <div className="relative pt-5 md:pb-8">
        <div className="flex flex-col pt-10">
          <div className="pt-10">
            <h1
              className="md:text-[60px] text-[40px] font-semibold md:py-5 text-[#0D4883] text-center"
              style={{ fontFamily: 'Arlonbold' }}>
              Article
            </h1>
          </div>
          <div className="bg-[#0D4883] relative px-4 pb-10 pt-10">
            <div className="grid gap-6 md:grid-cols-3">
              {articles.map((item) => (
                <ApiArticle
                  key={item.id}
                  id={item.id}
                  image={
                    item.image
                      ? // ? `http://127.0.0.1:8000/storage/${item.image}`
                        `http://api-serviceinosustain.com/api/storage/${item.image}`
                      : Image
                  }
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

      <div className=" md:mt-0 p-5 md:p-[40px]">
        <FooterComponent />
      </div>
    </div>
  );
};

export default AllArticle;
