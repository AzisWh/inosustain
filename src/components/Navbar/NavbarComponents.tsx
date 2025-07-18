'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Button,
} from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../../assets/images/logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { authService } from '../../api/authServices';
import { logout } from '../../redux/auth/authSlice';
import toast from 'react-hot-toast';
import { RootState } from '../../redux/store';
import { useLanguage } from '../../context/BahasaContext';

export const NavbarComponents = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [scroll, setScroll] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const { language, changeLanguage } = useLanguage();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      toast.success('Logout berhasil');
      navigate('/');
    } catch (error) {
      toast.error('Gagal logout. Silakan coba lagi.');
      console.error(error);
    }
  };

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

  const dropdownItemStyle = (href: string) =>
    `!w-full !text-start !px-3 !py-2 !rounded-md !transition-colors !duration-200
    ${
      pathname === href
        ? '!bg-[#0D4883] !text-white'
        : '!text-[#0D4883] hover:!bg-[#E6F0FA]'
    }`;

  return (
    <div className="px-4 md:px-10">
      <Navbar
        className={`!bg-white !fixed !w-full !z-50 !start-0 !top-0 !transition-shadow duration-300 ${
          scroll ? '!shadow-xl' : ''
        }`}
        style={{ fontFamily: 'PoppinsRegular' }}>
        <NavbarBrand href="/">
          <img src={Logo} className="h-10 md:h-[67px]" alt="Inosustain Logo" />
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <Link to="/" className={navItemStyle('/')}>
            Home
          </Link>
          <Link to="/about" className={navItemStyle('/about')}>
            About
          </Link>
          <Link to="/services" className={navItemStyle('/services')}>
            Services
          </Link>
          <Link to="/blog" className={navItemStyle('/blog')}>
            Blog
          </Link>

          <Dropdown
            inline
            renderTrigger={() => (
              <span className="!text-[#0D4883] hover:!bg-[#E6F0FA] !px-3 !py-2 !rounded-md cursor-pointer">
                Projects
              </span>
            )}
            className="!bg-white !border-4 !border-blue-200 !rounded-xl !text-[#0D4883]">
            {user && (
              <DropdownHeader>
                <span className="block text-sm text-[#0D4883]">
                  {user.nama_depan} {user.nama_belakang}
                </span>
                <span className="block truncate text-sm font-medium text-[#0D4883]">
                  {user.email}
                </span>
              </DropdownHeader>
            )}

            <DropdownDivider />

            <DropdownItem
              as={Link}
              to="/article"
              className={dropdownItemStyle('/article')}>
              Article
            </DropdownItem>
            <DropdownItem
              as={Link}
              to="/postArticle"
              className={dropdownItemStyle('/postArticle')}>
              Publish Artikel
            </DropdownItem>
            <DropdownItem
              as={Link}
              to="/userArticle"
              className={dropdownItemStyle('/userArticle')}>
              Article ku
            </DropdownItem>
          </Dropdown>

          <Link to="/contactus" className={navItemStyle('/contactus')}>
            Contact
          </Link>

          
          <div className="w-full mt-2 md:w-auto md:mt-0">
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value as 'id' | 'en')}
              className="w-full md:w-auto text-[#0D4883] border border-blue-400 rounded px-2 py-1">
              <option value="id">Bahasa</option>
              <option value="en">English</option>
            </select>
          </div>

          {user ? (
            <Button
              onClick={handleLogout}
              className="!bg-red-600 !w-full !text-white !rounded-xl !px-5 !text-sm !font-bold hover:!bg-red-700"
              pill
              style={{ fontFamily: 'PoppinsRegular' }}>
              Logout
            </Button>
          ) : (
            <Button
              className="!bg-[#0D4883] !w-full !text-white !rounded-xl !px-5 !text-sm !font-bold hover:!bg-[#083766]"
              pill
              style={{ fontFamily: 'PoppinsRegular' }}>
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};
