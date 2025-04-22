import ServiceCard from '../../../components/ServiceCard/ServiceCard';
import { ServiceCardContent } from '../../../components/ServiceCard/CardItem';

const ServiceSection = () => {
  return (
    <section className="relative px-4 pb-10">
      <div className={`transition-all duration-700 ease-in-out `}>
        <div className="grid gap-6 md:grid-cols-3">
          {ServiceCardContent.map((content) => (
            <ServiceCard
              key={content.id}
              image={content.image}
              title={content.title}
              desc={content.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
