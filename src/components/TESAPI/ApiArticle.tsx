import React from 'react';
import { Card } from 'flowbite-react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

export interface ArticleItem {
  id: number;
  image: string;
  title: string;
  descrip: string;
  penulis: string;
  email: string;
}

const ApiArticle: React.FC<ArticleItem> = ({
  id,
  image,
  title,
  descrip,
  penulis,
  email,
}) => {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]+>/g, '');
  };

  const plainText = stripHtml(descrip);
  const shortDesc =
    plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText;
  return (
    <Card className="!w-full !bg-white !shadow-xl !border-0 !mb-5 h-full flex flex-col items-center justify-between">
      <div className="text-center">
        <img
          src={image}
          alt="Service Image"
          className="mt-4 w-[342px] h-[256px] object-contain"
        />
        <p className="mt-2 text-sm text-gray-500">
          {penulis} - {email}
        </p>
        <h5
          className="md:text-[30px] text-[25px] font-bold text-[#0D4883]"
          style={{ fontFamily: 'DMSans' }}>
          {title}
        </h5>
        <span className="flex-grow mt-2 text-sm text-gray-600">
          {shortDesc}
        </span>
      </div>
      <div className="flex items-center justify-center">
        <Link to={`/articleDetail/${id}`}>
          <Button
            text={'More Detail'}
            type="button"
            className="duration-300 px-6 py-2 md:w-[180px] border-2 border-[#0D4883] text-[#0D4883] hover:text-white hover:bg-[#0D4883] hover:border-white rounded-full font-bold text-[16px] md:text-lg"
          />
        </Link>
      </div>
    </Card>
  );
};

export default ApiArticle;
