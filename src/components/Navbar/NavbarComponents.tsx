'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  // Dropdown,
  // DropdownItem,
  Button,
} from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../../assets/images/logo.svg';

export const NavbarComponents = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemStyle = (href: string) =>
    `!px-3 !py-2 !rounded-md !transition-colors !duration-200 
    ${
      pathname === href
        ? '!bg-[#0D4883] !text-white'
        : '!text-[#0D4883] hover:!bg-[#E6F0FA]'
    }`;

  return (
    <div className="md:px-10 px-4">
      <Navbar
        className={`!bg-white !fixed !w-full !z-50 !start-0 !top-0 !transition-shadow duration-300 ${
          scroll ? '!shadow-xl' : ''
        }`}
        style={{ fontFamily: 'PoppinsRegular' }}>
        <NavbarBrand href="/">
          <img src={Logo} className="h-10 md:h-[67px]" alt="Inosustain Logo" />
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse className="">
          <NavbarLink href="/" className={navItemStyle('/')}>
            Home
          </NavbarLink>
          <NavbarLink href="/about" className={navItemStyle('/about')}>
            About
          </NavbarLink>
          <NavbarLink href="/services" className={navItemStyle('/services')}>
            Services
          </NavbarLink>
          <NavbarLink href="/contact" className={navItemStyle('/contact')}>
            Contact
          </NavbarLink>

          <Button
            className=" !bg-[#0D4883] !w-full !text-white !rounded-xl !px-5 !text-sm !font-bold hover:!bg-[#083766]"
            pill
            style={{ fontFamily: 'PoppinsRegular' }}>
            Sign In
          </Button>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};
