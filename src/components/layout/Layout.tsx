import React from 'react';
import { Outlet } from 'react-router-dom';
import { StickyNavbar } from './StickyNavbar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <StickyNavbar />
      {/* Spacer for sticky navbar */}
      <div className="pt-24 flex-grow flex flex-col items-center w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
