import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import HeroAbout from './section/HeroAbout';

const About = () => {
  return (
    <div>
      <div className="relative w-full">
        <NavbarComponents />
      </div>
      <div className="relative p-10 md:p-0 bg-[#0D4883]">
        <HeroAbout />
      </div>
    </div>
  );
};

export default About;
