// import React from 'react';
import LogoBg from '../../../assets/images/logo-bg.svg';
import { Button } from '../../../components/Button/Button';

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-2 mt-15 md:mt-0 md:px-16">
      <div
        className="w-full md:w-1/2 text-left space-y-4"
        data-aos="fade-right">
        <h1
          className="text-[40px] md:text-[60px] md:text-5xl font-bold text-white"
          style={{ fontFamily: 'Arlonbold' }}>
          Inosustain
        </h1>
        <p
          className="text-lg text-white text-[15px] md:text-[20px]"
          style={{ fontFamily: 'MDSans' }}>
          <span className="font-extrabold">Inosustain</span>{' '}
          <span className="font-extralight">
            adalah lembaga independen yang bergerak di bidang penelitian dan
            konsultan berbagai Program Berkelanjutan.
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

      <div className="w-full md:w-1/2 flex justify-center" data-aos="fade-left">
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
