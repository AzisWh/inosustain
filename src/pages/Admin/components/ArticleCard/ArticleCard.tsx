import { Card } from 'flowbite-react';
import { Button } from '../../../../components/Button/Button';
import { Link } from 'react-router-dom';

export interface ArticleItem {
  id: number;
  image: string;
  title: string;
  descrip: string;
  penulis: string;
  email: string;
  verifikasi_admin: 'menunggu' | 'disetujui' | 'ditolak';
}
const ArticleCardDashboard: React.FC<ArticleItem> = ({
  id,
  image,
  title,
  descrip,
  penulis,
  email,
  verifikasi_admin,
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
        {verifikasi_admin === 'menunggu' && (
          <span className="px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded top-4 right-4">
            {verifikasi_admin}
          </span>
        )}
        {verifikasi_admin === 'disetujui' && (
          <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded top-4 right-4">
            {verifikasi_admin}
          </span>
        )}
        {verifikasi_admin === 'ditolak' && (
          <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded top-4 right-4">
            {verifikasi_admin}
          </span>
        )}
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
      <div className="flex flex-col items-center justify-center gap-4">
        {/* <Link to={`/edit-Artikel/${id}`}>
          <Button
            text={'Edit Article'}
            type="button"
            className="duration-300 px-6 py-2 md:w-[180px] border-2 border-[#0D4883] text-[#0D4883] hover:text-white hover:bg-[#0D4883] hover:border-white rounded-full font-bold text-[16px] md:text-lg"
          />
        </Link> */}
        {verifikasi_admin === 'menunggu' && (
          <Link to={`/statusupdate/${id}`}>
            <Button
              text="Update Status"
              type="button"
              className="duration-300 px-6 py-2 md:w-[180px] bg-yellow-500 text-white hover:bg-yellow-600 rounded-full font-bold text-[16px] md:text-lg"
            />
          </Link>
        )}
      </div>
    </Card>
  );
};

export default ArticleCardDashboard;
