import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import HeroAbout from './section/HeroAbout';
import VisiMisi from './section/VisiMisi';

const About = () => {
  return (
    <div>
      <div className="relative w-full">
        <NavbarComponents />
      </div>
      <div className="relative p-10 md:p-0 bg-[#0D4883]">
        <HeroAbout />
      </div>
      <div className="relative pt-5 pb-16">
        <div className="flex flex-col">
          <h1
            className="md:text-[60px] text-[40px] font-semibold md:py-5 text-[#0D4883] text-center"
            style={{ fontFamily: 'Arlonbold' }}>
            Visi & Misi
          </h1>
          <VisiMisi />
        </div>
      </div>
    </div>
  );
};

export default About;
