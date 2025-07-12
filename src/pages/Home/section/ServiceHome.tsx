import { useState, useRef, useEffect } from 'react';
import ServiceCard from '../../../components/ServiceCard/ServiceCard';
import { ServiceCardContent } from '../../../components/ServiceCard/CardItem';
import { Button } from '../../../components/Button/Button';
import { useLanguage } from '../../../context/BahasaContext';

const ServiceHome = () => {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = expanded ? ServiceCardContent.length : 3;
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (expanded && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [expanded]);

  return (
    <section className="relative px-4 pb-10">
      <div
        ref={containerRef}
        className={`transition-all duration-700 ease-in-out `}>
        <div className="grid gap-6 md:grid-cols-3">
          {ServiceCardContent.slice(0, visibleCount).map((content) => (
            <ServiceCard
              key={content.id}
              image={content.image}
              title={content.title}
              desc={content.desc[language]} 
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button
          text={expanded ? 'Show Less' : 'Show More'}
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="duration-300 px-6 py-2 md:w-[180px] border-2 border-[#0D4883] text-[#0D4883] hover:text-white hover:bg-[#0D4883] hover:border-white rounded-full font-bold text-[16px] md:text-lg"
        />
      </div>
    </section>
  );
};

export default ServiceHome;
