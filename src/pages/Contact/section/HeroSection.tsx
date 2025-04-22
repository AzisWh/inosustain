import React from 'react';

const HeroSection = () => {
  return (
    <div className="flex flex-col md:px-12">
      <h1
        className="md:text-[60px] text-[40px] font-semibold md:py-5 text-[#0D4883] text-center"
        style={{ fontFamily: 'Arlonbold' }}>
        Contact Us
      </h1>
      <p
        className="text-center px-12 mt-10 md:mt-0 text-sm md:text-md"
        style={{ fontFamily: 'PoppinsRegular' }}>
        We value your interest and involvement in the 1215 Tribes community.
        Whether you have questions, need support, or want to get more involved,
        we're here to help. Below are the ways you can reach out to us directly
        or stay connected through our updates.
      </p>
    </div>
  );
};

export default HeroSection;
