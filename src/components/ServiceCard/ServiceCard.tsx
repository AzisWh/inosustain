import { Card } from 'flowbite-react';
import React from 'react';

interface ServiceCardProps {
  image: string;
  title: string;
  desc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, desc }) => {
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
          {desc}
        </p>
      </div>
    </Card>
  );
};

export default ServiceCard;
