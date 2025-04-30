import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import { FooterComponent } from '../../components/Footer/FooterComponents';
import HeroArticle from './Section/HeroArticle';

const AllArticle = () => {
  return (
    <div>
      <div className="relative w-full">
        <NavbarComponents />
      </div>
      <div className="relative pt-5 md:pb-8">
        <div className="flex flex-col pt-10">
          <div className="pt-10">
            <h1
              className="md:text-[60px] text-[40px] font-semibold md:py-5 text-[#0D4883] text-center"
              style={{ fontFamily: 'Arlonbold' }}>
              Article
            </h1>
          </div>
          <div className="bg-[#0D4883] pt-10">
            <HeroArticle />
          </div>
        </div>
      </div>

      <div className=" md:mt-0 p-5 md:p-[40px]">
        <FooterComponent />
      </div>
    </div>
  );
};

export default AllArticle;
