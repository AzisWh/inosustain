// import React from 'react';
import LogoBg from '../../../assets/images/logo-bg.svg';
import { Button } from '../../../components/Button/Button';
import { useLanguage } from '../../../context/BahasaContext';

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="flex flex-col items-center justify-between px-2 md:flex-row mt-15 md:mt-0 md:px-16">
      <div
        className="w-full space-y-4 text-left md:w-1/2"
        data-aos="fade-right">
        <h1
          className="text-[40px] md:text-[60px] md:text-5xl font-bold text-white"
          style={{ fontFamily: 'Arlonbold' }}>
          Inosustain
        </h1>
        <p
          className="text-lg text-white text-[15px] md:text-[20px]"
          style={{ fontFamily: 'PoppinsRegular' }}>
          <span className="font-extrabold">Inosustain</span>{' '}
          <span className="font-extralight">
            {t.home_description}
          </span>
        </p>
        <Button
          text="Explore"
          type="button"
          onClick={() => {
            const target = document.getElementById('jajal');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="md:flex duration-300 w-full h-full md:w-[100px] hover:bg-white text-[16px] md:text-5xl border border-white rounded-[50px] text-white font-bold hover:text-[#0D4883] bg-transparant"
        />
      </div>

      <div className="flex justify-center w-full md:w-1/2" data-aos="fade-left">
        <img
          src={LogoBg}
          alt="Hero Image"
          className="md:w-[600px] md:h-[600px] w-full h-full mt-8 md:mt-0"
        />
      </div>
    </section>
  );
};

export default Hero;
