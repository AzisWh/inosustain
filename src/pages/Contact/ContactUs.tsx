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
      <div className="mt-10 p-5 ">
        <FooterComponent />
      </div>
    </div>
  );
};

export default ContactUs;
