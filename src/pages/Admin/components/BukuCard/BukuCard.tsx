import { Card } from 'flowbite-react';
import { Button } from '../../../../components/Button/Button';
import { Link } from 'react-router-dom';
import Image from '../../../../assets/images/PAT.png';

interface BukuCardProps {
  id: number;
  title: string;
  author: string;
  penerbit: string;
  tahun: string;
}

const BukuCard: React.FC<BukuCardProps> = ({
  id,
  title,
  author,
  penerbit,
  tahun,
}) => {
  return (
    <Card className="!w-full !bg-white !shadow-xl !border-0 !mb-5 h-full flex flex-col items-center justify-between">
      <div className="text-center">
        <img
          src={Image}
          alt="Buku Cover"
          className="mt-4 w-[342px] h-[256px] object-contain"
        />

        <h5
          className="md:text-[24px] text-[20px] font-bold text-[#0D4883]"
          style={{ fontFamily: 'DMSans' }}>
          {title}
        </h5>
        <p className="mt-1 text-sm text-gray-600">Author: {author}</p>
        <p className="text-sm text-gray-600">Penerbit: {penerbit}</p>
        <p className="mb-2 text-sm text-gray-600">Tahun: {tahun}</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <Link to={`/BukuDetail/${id}`}>
          <Button
            text={'Detail Buku'}
            type="button"
            className="duration-300 px-6 py-2 md:w-[180px] border-2 border-[#0D4883] text-[#0D4883] hover:text-white hover:bg-[#0D4883] hover:border-white rounded-full font-bold text-[16px] md:text-lg"
          />
        </Link>
      </div>
    </Card>
  );
};

export default BukuCard;
