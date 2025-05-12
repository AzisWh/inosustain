import { Card } from 'flowbite-react';
import { Button } from '../../../../components/Button/Button';
import { Link } from 'react-router-dom';

interface BlogItem {
  id: number;
  image: string;
  title: string;
  content: string;
  status: 'onhold' | 'onpost';
}
const BlogCard: React.FC<BlogItem> = ({
  id,
  image,
  title,
  content,
  status,
}) => {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]+>/g, '');
  };

  const plainText = stripHtml(content);
  const shortDesc =
    plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText;

  return (
    <>
      <Card className="!w-full !bg-white !shadow-xl !border-0 !mb-5 h-full flex flex-col items-center justify-between">
        <div className="text-center">
          <img
            src={image}
            alt="Blog Image"
            className="mt-4 w-[342px] h-[256px] object-contain"
          />
          <span
            className={`px-2 py-1 text-xs font-semibold text-white rounded top-4 right-4 ${
              status === 'onpost' ? 'bg-blue-500' : 'bg-yellow-500'
            }`}>
            {status}
          </span>
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
          <Link to={`/detailBlog/${id}`}>
            <Button
              text={'Detail Blog'}
              type="button"
              className="duration-300 px-6 py-2 md:w-[180px] border-2 border-[#0D4883] text-[#0D4883] hover:text-white hover:bg-[#0D4883] hover:border-white rounded-full font-bold text-[16px] md:text-lg"
            />
          </Link>
          <Link to={`/editBlog/${id}`}>
            <Button
              text={'edit Blog'}
              type="button"
              className="duration-300 px-6 py-2 md:w-[180px] border-2 border-[#0D4883] text-[#0D4883] hover:text-white hover:bg-[#0D4883] hover:border-white rounded-full font-bold text-[16px] md:text-lg"
            />
          </Link>
        </div>
      </Card>
    </>
  );
};

export default BlogCard;
