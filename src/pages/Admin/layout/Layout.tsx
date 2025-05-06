'use client';

import Sidebar from '../components/Sidebar/Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full min-h-screen p-6 ml-64 bg-gray-100">
        {children}
      </main>
    </div>
  );
}

export default Layout;
