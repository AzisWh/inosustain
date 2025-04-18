import React, { useEffect, useRef, useState } from 'react';
import { ItemSlider, PartnerItem } from './ItemSlider';

export const Slider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const loopedItems = [...ItemSlider, ...ItemSlider];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollSpeed = 1;
    let animationFrame: number;

    const scroll = () => {
      if (!isHovered && slider) {
        slider.scrollLeft += scrollSpeed;

        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);
  return (
    <div className="w-full py-10 px-6 bg-[#F6F6F6] rounded-lg">
      <div className="flex flex-col">
        <h1
          className="md:text-[60px] text-[40px] font-semibold md:py-5 text-[#0D4883] text-center"
          style={{ fontFamily: 'Arlonbold' }}>
          Our Partner
        </h1>
      </div>
      <div
        className="overflow-x-auto scrollbar-hide"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={sliderRef}>
        <div className="flex gap-4 items-center px-2 md:px-10 min-w-max snap-x snap-mandatory scroll-smooth">
          {loopedItems.map((partner: PartnerItem, index: number) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 flex justify-center items-center bg-transparent rounded-lg  px-4 py-3"
              style={{
                width: partner.width ?? 150,
                height: partner.height ?? 80,
              }}>
              <img
                src={partner.image}
                alt={partner.alt}
                className="object-contain"
                style={{
                  width: partner.width,
                  height: partner.height,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
