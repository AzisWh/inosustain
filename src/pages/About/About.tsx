import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import HeroAbout from './section/HeroAbout';
import VisiMisi from './section/VisiMisi';
import CoreValue from './section/CoreValue';
import { FooterComponent } from '../../components/Footer/FooterComponents';

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
      <div className="relative pt-5">
        <div className="flex flex-col">
          <h1
            className="md:text-[60px] text-[40px] font-semibold md:py-5 text-[#0D4883] text-center"
            style={{ fontFamily: 'Arlonbold' }}>
            Core Value
          </h1>
          <CoreValue />
        </div>
      </div>
      <div className="mt-10 md:mt-0 p-5 md:p-[40px]">
        <FooterComponent />
      </div>
    </div>
  );
};

export default About;
