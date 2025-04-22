import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import { FooterComponent } from '../../components/Footer/FooterComponents';
import HeroSection from './section/HeroSection';

const ContactUs = () => {
  return (
    <div className="relative w-full">
      <NavbarComponents />
      <div className="relative pt-10 mt-10">
        <HeroSection />
      </div>
      <div className="mt-10 md:mt-64 p-5 md:p-[40px]">
        <FooterComponent />
      </div>
    </div>
  );
};

export default ContactUs;
