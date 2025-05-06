'use client';

import {
  Sidebar as SidebarFlowbite,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from 'flowbite-react';
import { HiChartPie, HiInbox, HiShoppingBag, HiUser } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../../redux/store';
import { authService } from '../../../../api/authServices';
import { logout } from '../../../../redux/auth/authSlice';
import toast from 'react-hot-toast';

export function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
  return (
    <SidebarFlowbite
      aria-label="Admin Sidebar"
      className="fixed top-0 left-0 w-64 h-screen text-white bg-gray-800">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            href="/dashboard-admin"
            icon={HiChartPie}
            className="text-white hover:bg-gray-700">
            Dashboard
          </SidebarItem>
          <SidebarCollapse
            icon={HiShoppingBag}
            label="Articles"
            className="text-white hover:bg-gray-700">
            <SidebarItem
              href="/article-admin"
              className="text-white hover:bg-gray-700">
              List Articles
            </SidebarItem>
            <SidebarItem
              href="/update-article"
              className="text-white hover:bg-gray-700">
              Update Article Status
            </SidebarItem>
            <SidebarItem
              href="/Admin/articles/drafts"
              className="text-white hover:bg-gray-700">
              Drafts
            </SidebarItem>
            <SidebarItem
              href="/Admin/articles/categories"
              className="text-white hover:bg-gray-700">
              Categories
            </SidebarItem>
          </SidebarCollapse>
          <SidebarItem
            href="/Admin/users"
            icon={HiUser}
            className="text-white hover:bg-gray-700">
            Users
          </SidebarItem>
          <SidebarItem
            href="/Admin/settings"
            icon={HiInbox}
            className="text-white hover:bg-gray-700">
            Settings
          </SidebarItem>
        </SidebarItemGroup>
        <div className="px-3 pb-3">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-red-600 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </SidebarItems>
    </SidebarFlowbite>
  );
}

export default Sidebar;
