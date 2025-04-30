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

const Article: React.FC<ArticleItem> = ({
  id,
  image,
  title,
  descrip,
  penulis,
  email,
}) => {
  const shortDesc =
    descrip.length > 100 ? descrip.slice(0, 100) + '...' : descrip;
  return (
    <Card className="!w-full !bg-white !shadow-xl !border-0 !mb-5 h-full flex flex-col items-center justify-between">
      <div className="text-center">
        <img
          src={image}
          alt="Service Image"
          className="mt-4 w-[342px] h-[256px] object-contain"
        />
        <p className="text-sm text-gray-500 mt-2">
          {penulis} - {email}
        </p>
        <h5
          className="md:text-[30px] text-[25px] font-bold text-[#0D4883]"
          style={{ fontFamily: 'DMSans' }}>
          {title}
        </h5>
        <p className="text-gray-600 text-sm mt-2 flex-grow">{shortDesc}</p>
      </div>
      <div className="flex items-center justify-center">
        <Link to={`/DetailArticle/${id}`}>
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

export default Article;
