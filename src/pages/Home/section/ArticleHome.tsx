import { useRef } from 'react';
import Article from '../../../components/Article/Article';
import { ArticleItem } from '../../../components/Article/ItemArticle';

const ArticleHome = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative px-4 pb-10">
      <div
        ref={containerRef}
        className={`transition-all duration-700 ease-in-out `}>
        <div className="grid gap-6 md:grid-cols-3">
          {ArticleItem.slice(0, 3).map((content) => (
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

export default ArticleHome;
