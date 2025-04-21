const VisiMisi = () => {
  return (
    <section
      className="flex flex-col items-center justify-center px-4 md:px-16 bg-white"
      style={{ fontFamily: 'DMSans' }}>
      <div className="Visi flex flex-col md:flex-row w-full md:space-x-8 space-y-6 md:space-y-0 max-w-4xl">
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-[20px] md:text-[40px] font-extrabold text-[#0D4883] mb-4 text-center underline underline-offset-8 ">
            Visi
          </h3>
          <p className="text-[#0D4883] text-[16px] text-center md:text-left">
            Menjadi lembaga riset dan konsultan yang inovatif dengan
            mengedepankan tata kelola dan budaya kerja yang baik, peduli
            terhadap lingkungan dan kesejahteraan masyarakat.
          </p>
        </div>
        <div className="Misi flex-1 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-[20px] md:text-[40px] font-extrabold text-[#0D4883] mb-4 text-center underline underline-offset-8">
            Misi
          </h3>
          <ul className="list-disc text-[#0D4883] text-[16px] pl-5 space-y-2">
            <li>
              Menerapkan Tata Kelola Perusahaan Yang Baik (Good Corporate
              Governance)
            </li>
            <li>
              Meningkatkan kapasitas dan kompetensi sumber daya manusia yang
              inovatif, profesional, dan berintegritas
            </li>
            <li>
              Membangun jejaring dan hubungan kemitraan strategis untuk
              mewujudkan kesejahteraan masyarakat
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;
