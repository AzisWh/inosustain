import React from 'react';

interface BtnProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<BtnProps> = ({
  text,
  type = 'button',
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 md:text-[14px] text-sm font-medium rounded-full duration-300 ${className}`}>
      {text}
    </button>
  );
};
