import React from 'react';
import { Card } from 'flowbite-react';
import { Button } from '../Button/Button';

export interface ArticleItem {
  image: string;
  title: string;
  descrip: string;
}

const Article: React.FC<ArticleItem> = ({ image, title, descrip }) => {
  return (
    <Card className="!w-full !bg-white !shadow-xl !border-0 !mb-5 h-full flex flex-col items-center justify-between">
      <div className="text-center">
        <img
          src={image}
          alt="Service Image"
          className="mt-4 w-[342px] h-[256px]  object-contain"
        />
        <h5
          className="md:text-[30px] text-[25px] font-bold text-[#0D4883]"
          style={{ fontFamily: 'DMSans' }}>
          {title}
        </h5>
        <p
          className="font-normal text-gray-700"
          style={{ fontFamily: 'DMSans' }}>
          {descrip}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Button
          text={'More Detail'}
          type="button"
          onClick={() => console.log('ehehenak')}
          className="duration-300 px-6 py-2 md:w-[180px] border-2 border-[#0D4883] text-[#0D4883] hover:text-white hover:bg-[#0D4883] hover:border-white rounded-full font-bold text-[16px] md:text-lg"
        />
      </div>
    </Card>
  );
};

export default Article;
