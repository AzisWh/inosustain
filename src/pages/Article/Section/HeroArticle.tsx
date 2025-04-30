import Article from '../../../components/Article/Article';
import { ArticleItem } from '../../../components/Article/ItemArticle';

const HeroArticle = () => {
  return (
    <section className="relative px-4 pb-10">
      <div className={`transition-all duration-700 ease-in-out `}>
        <div className="grid gap-6 md:grid-cols-3">
          {ArticleItem.slice().map((content) => (
            <Article
              key={content.id}
              image={content.image}
              title={content.title}
              descrip={content.descrip}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroArticle;
