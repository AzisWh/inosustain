import LogoBg from '../../../assets/images/logo-bg.svg';

const HeroAbout = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-2 mt-15 md:mt-0 md:px-16">
      <div className="w-full md:w-1/2 flex justify-center" data-aos="fade-left">
        <img
          src={LogoBg}
          alt="Hero Image"
          className="md:w-[600px] md:h-[600px] w-full h-full mt-8 md:mt-0"
        />
      </div>
      <div
        className="w-full md:w-1/2 text-left space-y-4"
        data-aos="fade-right">
        <h1
          className="text-[40px] md:text-[60px] md:text-5xl font-bold text-white mt-5 md:mt-0"
          style={{ fontFamily: 'Arlonbold' }}>
          Inosustain
        </h1>
        <p
          className="text-lg text-white text-[15px] md:text-[20px] "
          style={{ fontFamily: 'MDSans' }}>
          <span className="font-extrabold">Inosustain</span>{' '}
          <span className="font-extralight">
            bercita-cita untuk menjadi mitra terpercaya dalam menciptakan solusi
            berkelanjutan yang mengintegrasikan pelestarian lingkungan dan
            pemberdayaan masyarakat melalui penciptaan tata kelola dan budaya
            kerja perusahaan yang baik.
          </span>
        </p>
      </div>
    </section>
  );
};

export default HeroAbout;
