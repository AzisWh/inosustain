import { NavbarComponents } from '../../components/Navbar/NavbarComponents';
import { FooterComponent } from '../../components/Footer/FooterComponents';
import ServiceSection from './Section/ServiceSection';

const Services = () => {
  return (
    <div className="relative w-full">
      <NavbarComponents />
      <div className="relative pt-10 mt-10">
        <div className="flex flex-col">
          <h1
            className="md:text-[60px] text-[40px] font-semibold md:py-5 text-[#0D4883] text-center"
            style={{ fontFamily: 'Arlonbold' }}>
            Services
          </h1>
        </div>
        <ServiceSection />
      </div>
      <div className="mt-10 md:mt-0 p-5 md:p-[40px]">
        <FooterComponent />
      </div>
    </div>
  );
};

export default Services;
