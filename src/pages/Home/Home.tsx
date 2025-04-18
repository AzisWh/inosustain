import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import Hero from './section/Hero';
import ServiceHome from './section/ServiceHome';
import { Slider } from '../../components/Slider/Slider';

const Home = () => {
  return (
    <div className="relative w-full" style={{ paddingBottom: 1000 }}>
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
      <div className="mt-10 md:mt-0 md:p-[80px]">
        <div className="py-5">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Home;
