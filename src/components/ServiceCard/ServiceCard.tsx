import { Card } from 'flowbite-react';
import React from 'react';

interface ServiceCardProps {
  image: string;
  title: string;
  desc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, desc }) => {
  return (
    <Card
      className="!w-full !bg-white !shadow-xl !border-0 !mb-5 "
      imgAlt="Service Image"
      imgSrc={image}>
      <h5
        className="md:text-[30px] text-[25px] font-bold text-center text-[#0D4883]"
        style={{ fontFamily: 'DMSans' }}>
        {title}
      </h5>
      <p
        className="font-normal text-gray-700  text-center"
        style={{ fontFamily: 'DMSans' }}>
        {desc}
      </p>
    </Card>
  );
};

export default ServiceCard;
