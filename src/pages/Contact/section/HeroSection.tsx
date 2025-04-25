import location from '../../../assets/icon/location.svg';
import mail from '../../../assets/icon/mail.svg';
import phone from '../../../assets/icon/phone.svg';

const HeroSection = () => {
  return (
    <div className="flex flex-col md:px-12">
      <div className="pb-10">
        <h1
          className="md:text-[60px] text-[40px] font-semibold md:py-5 text-[#0D4883] text-center"
          style={{ fontFamily: 'Arlonbold' }}>
          Contact Us
        </h1>
        <p
          className="text-center px-12 mt-10 md:mt-0 text-md md:text-lg"
          style={{ fontFamily: 'PoppinsRegular' }}>
          We value your interest and involvement in the 1215 Tribes community.
          Whether you have questions, need support, or want to get more
          involved, we're here to help. Below are the ways you can reach out to
          us directly or stay connected through our updates.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8 bg-[#F6F6F6] rounded-lg">
        <div className="flex items-center justify-center">
          <h1
            style={{ fontFamily: 'PoppinsBold' }}
            className="text-[40px] text-[#0D4883]">
            Get In <br /> Touch
          </h1>
        </div>
        <div className="flex flex-row bg-[#0D4883] p-4 md:p-0 rounded-2xl items-center justify-center gap-2">
          <img src={location} alt="/" className="w-8 " />
          <p
            className="text-white font-semibold"
            style={{ fontFamily: 'DMSans' }}>
            545 Mavis Island, IL 99191
          </p>
        </div>
        <div className="flex flex-row bg-[#0D4883] p-4 md:p-0 rounded-2xl items-center justify-center gap-2">
          <img src={mail} alt="/" className="w-8" />
          <p className="text-white font-semibold">inosustain@gmail.com</p>
        </div>
        <div className="flex flex-row bg-[#0D4883] p-4 md:p-0 rounded-2xl items-center justify-center gap-2">
          <img src={phone} alt="/" className="w-8" />
          <p
            className="text-white font-semibold"
            style={{ fontFamily: 'DMSans' }}>
            +62 8888888888
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
