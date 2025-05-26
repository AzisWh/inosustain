import { useState, useEffect } from 'react';
import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import { FooterComponent } from '../../components/Footer/FooterComponents';
import { ArticleType } from '../../type/article';
import { articleService } from '../../api/articleServies';
import UserArticleCard from '../../components/Article/UserArticleCard';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import Image from '../../assets/images/PAT.png';
// import { AppDispatch } from '../../redux/store';

const UserArticle = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //   const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const initializeUserAndFetchArticles = async () => {
      if (!token || !user) {
        setError('Please login to view your articles.');
        setLoading(false);
        return;
      }

      try {
        const res = await articleService.userArticle();
        setArticles(res.artikels);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    initializeUserAndFetchArticles();
  }, [token, user]);

  return (
    <div>
      <NavbarComponents />
      <div className="container px-4 py-10 mx-auto">
        <h1
          className="text-3xl font-semibold text-center text-[#0D4883] mt-10 md:mt-15 md:mb-10"
          style={{ fontFamily: 'Arlonbold' }}>
          My Articles
        </h1>
        {loading ? (
          <p className="py-10 text-center">Loading...</p>
        ) : error ? (
          <p className="py-10 text-center text-red-500">{error}</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-500">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((item) => (
              <UserArticleCard
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
                verifikasi_admin={item.verifikasi_admin}
              />
            ))}
          </div>
        )}
      </div>
      <FooterComponent />
    </div>
  );
};

export default UserArticle;
