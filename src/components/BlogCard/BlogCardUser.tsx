import { Card } from "flowbite-react";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

interface BlogItem {
  id: number;
  image: string;
  title: string;
  content: string;
}

const BlogCardUser: React.FC<BlogItem> = ({ id, image, title, content }) => {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]+>/g, "");
  };

  const plainText = stripHtml(content);
  const shortDesc =
    plainText.length > 100 ? plainText.slice(0, 100) + "..." : plainText;

  return (
    <>
      <Card className="!w-full !bg-white !shadow-xl !border-0 !mb-5 h-full flex flex-col items-center justify-between">
        <div className="text-center">
          <img
            src={image}
            alt="Blog Image"
            className="mt-4 w-[342px] h-[256px] object-contain mx-auto"
          />
          <h5
            className="md:text-[30px] text-[25px] font-bold text-[#0D4883]"
            style={{ fontFamily: "DMSans" }}
          >
            {title}
          </h5>
          <span className="flex-grow mt-2 text-sm text-gray-600">
            {shortDesc}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <Link to={`/detailBlogUser/${id}`}>
            <Button
              text={"Detail Blog"}
              type="button"
              className="duration-300 px-6 py-2 md:w-[180px] border-2 border-[#0D4883] text-[#0D4883] hover:text-white hover:bg-[#0D4883] hover:border-white rounded-full font-bold text-[16px] md:text-lg"
            />
          </Link>
        </div>
      </Card>
    </>
  );
};

export default BlogCardUser;
