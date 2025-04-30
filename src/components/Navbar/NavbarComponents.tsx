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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { authService } from '../../api/authServices';
import { logout } from '../../redux/auth/authSlice';
import toast from 'react-hot-toast';
import { UserType } from '../../type/auth';

export const NavbarComponents = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [scroll, setScroll] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) return;

      try {
        const response = await authService.getProfile();
        setUser(response.user);
      } catch (error) {
        toast.error('Gagal mengambil profil user');
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

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
              to="/test"
              className={dropdownItemStyle('/test')}>
              Dashboard
            </DropdownItem>
            <DropdownItem
              as={Link}
              to="/roledua"
              className={dropdownItemStyle('/roledua')}>
              Test role
            </DropdownItem>
            <DropdownItem
              as={Link}
              to="/projects/earnings"
              className={dropdownItemStyle('/projects/earnings')}>
              Earnings
            </DropdownItem>
          </Dropdown>

          <Link to="/contactus" className={navItemStyle('/contactus')}>
            Contact
          </Link>

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
