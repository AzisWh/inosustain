import React from 'react';
import Logo from '../../assets/images/logo.svg';

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <img src={Logo} alt="/" />
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
