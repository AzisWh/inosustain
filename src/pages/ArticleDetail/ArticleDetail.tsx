import { useParams } from 'react-router-dom';
import { ArticleItem } from '../../components/Article/ItemArticle';
import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import { FooterComponent } from '../../components/Footer/FooterComponents';

const ArticleDetail = () => {
  const { id } = useParams();
  const article = ArticleItem.find((item) => item.id === Number(id));

  if (!article) return <div className="p-4">Artikel tidak ditemukan.</div>;
  return (
    <div>
      <div className="relative w-full">
        <NavbarComponents />
      </div>

      <div className="max-w-4xl mx-auto p-6 mt-10">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-[300px] object-contain mb-4"
        />
        <p className="text-sm text-gray-500">
          {article.penulis} - {article.email}
        </p>
        <h1 className="text-3xl font-bold text-[#0D4883] mt-2 mb-4">
          {article.title}
        </h1>
        <p className="text-gray-700 leading-relaxed">{article.descrip}</p>
      </div>

      <div className="md:mt-0 p-5 md:p-[40px]">
        <FooterComponent />
      </div>
    </div>
  );
};

export default ArticleDetail;
