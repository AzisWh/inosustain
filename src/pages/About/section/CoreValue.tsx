const coreValues = [
  {
    letter: 'T',
    title: 'Trustworthy',
    desc: 'Terpercaya dan menjaga kepercayaan terhadap setiap amanah dan tanggung jawab yang diberikan.',
  },
  {
    letter: 'E',
    title: 'Empathy',
    desc: 'Mampu memahami situasi dan persoalan yang sedang dihadapi.',
  },
  {
    letter: 'R',
    title: 'Resilience',
    desc: 'Menyesuaikan diri dalam menghadapi tantangan dan perubahan.',
  },
  {
    letter: 'A',
    title: 'Attitude',
    desc: 'Memiliki sikap, perilaku, dan etika yang baik.',
  },
  {
    letter: 'R',
    title: 'Responsible',
    desc: 'Bertanggung jawab dalam mengemban amanah pada setiap pekerjaan.',
  },
  {
    letter: 'A',
    title: 'Ability',
    desc: 'Senantiasa mengembangkan kemampuan dan kapasitas diri.',
  },
  {
    letter: 'H',
    title: 'Harmony',
    desc: 'Menghargai setiap perbedaan dalam membangun sinergi dan kerja sama yang baik.',
  },
];

const CoreValue = () => {
  return (
    <section
      className="px-4 md:px-16 py-12 bg-white"
      style={{ fontFamily: 'DMSans' }}>
      <h2 className="text-2xl md:text-3xl font-bold text-[#0D4883] text-center mb-10">
        Core Value
      </h2>
      <div className="space-y-8 max-w-3xl mx-auto">
        {coreValues.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start space-x-8 ">
            <div className="min-w-[60px] h-[60px] md:min-w-[80px] md:h-[80px] mb-5 md:mb-0 bg-[#0D4883] text-white rounded-full flex items-center justify-center font-extrabold text-4xl">
              {item.letter}
            </div>
            <div>
              <h3 className="text-[#0D4883]  font-extrabold text-4xl ">
                {item.title}
              </h3>
              <p className="text-[#0D4883] text-sm md:text-base ">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValue;
