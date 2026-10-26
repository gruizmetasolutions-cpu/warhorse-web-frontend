import React from 'react';
import { Outlet } from 'react-router-dom';
import { StickyNavbar } from './StickyNavbar';
import { Footer } from './Footer';
import { SeoHead } from '../seo/SeoHead';

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SeoHead />
      <header className="w-full">
        <StickyNavbar />
      </header>
      {/* Main Content Landmark with spacer for sticky navbar */}
      <main id="main-content" className="pt-24 flex-grow flex flex-col items-center w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
