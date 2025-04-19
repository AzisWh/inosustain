import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import Hero from './section/Hero';
import ServiceHome from './section/ServiceHome';
import { Slider } from '../../components/Slider/Slider';
import { FooterComponent } from '../../components/Footer/FooterComponents';
import ArticleHome from './section/ArticleHome';

const Home = () => {
  return (
    <div className="relative w-full">
      <NavbarComponents />
      <div className="relative p-10 md:p-0 bg-[#0D4883]">
        <Hero />
      </div>
      <div className="relative pt-10 ">
        <div className="flex flex-col">
          <h1
            className="md:text-[60px] text-[40px] font-semibold md:py-5 text-[#0D4883] text-center"
            style={{ fontFamily: 'Arlonbold' }}>
            Our Service
          </h1>
        </div>
        <ServiceHome />
      </div>
      <div className="relative pt-10 ">
        <div className="flex flex-col">
          <h1
            className="md:text-[60px] text-[40px] font-semibold md:py-5 text-[#0D4883] text-center"
            style={{ fontFamily: 'Arlonbold' }}>
            Check out our Article
          </h1>
        </div>
        <ArticleHome />
      </div>
      <div className="mt-10 md:mt-0 md:px-[40px]">
        <div className="py-5">
          <Slider />
        </div>
      </div>
      <div className="mt-10 md:mt-0 p-5 md:p-[40px]">
        <FooterComponent />
      </div>
    </div>
  );
};

export default Home;
