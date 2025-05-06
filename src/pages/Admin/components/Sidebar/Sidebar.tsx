'use client';

import {
  Sidebar as SidebarFlowbite,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from 'flowbite-react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from 'react-icons/hi';

export function Sidebar() {
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
              href="/Admin/articles/create"
              className="text-white hover:bg-gray-700">
              Create Article
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
      </SidebarItems>
    </SidebarFlowbite>
  );
}

export default Sidebar;
