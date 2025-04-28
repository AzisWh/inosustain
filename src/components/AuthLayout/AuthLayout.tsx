import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-gray-500 mb-8">{subtitle}</p>}
          {children}
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-blue-600 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold leading-tight mb-4">
          Explore the world’s leading design portfolios.
        </h1>
        <p className="text-lg text-blue-200 mb-8">
          Millions of designers and agencies around the world showcase their
          portfolio work on Flowbite.
        </p>
        <div className="flex items-center">
          <div className="flex -space-x-4">
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
              alt="avatar"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
              alt="avatar"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt="avatar"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
              alt="avatar"
            />
          </div>
          <span className="ml-4 font-medium text-blue-100">
            Over <strong>15.7k</strong> Happy Customers
          </span>
        </div>
      </div>
    </div>
  );
};
