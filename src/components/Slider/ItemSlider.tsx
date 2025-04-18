import antam from '../../assets/images/slider/AntamLogo.svg';
import inamul from '../../assets/images/slider/inalum.svg';
import its from '../../assets/images/slider/ITSTEKNO.svg';
import migas from '../../assets/images/slider/migas.svg';
import petlogo from '../../assets/images/slider/PETLogo.svg';

export interface PartnerItem {
  id: number;
  image: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

export const ItemSlider: PartnerItem[] = [
  { id: 1, image: antam, alt: 'Partner 1', width: 150, height: 150 },
  { id: 2, image: inamul, alt: 'Partner 2', width: 150, height: 150 },
  { id: 3, image: its, alt: 'Partner 3', width: 150, height: 150 },
  { id: 4, image: migas, alt: 'Partner 4', width: 189, height: 158 },
  { id: 5, image: petlogo, alt: 'Partner 5', width: 150, height: 150 },
];
