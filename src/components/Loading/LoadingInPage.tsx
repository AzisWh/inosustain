import React from "react";
// import Logo from "../../assets/images/logo.svg";

export const LoadingInPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
};
