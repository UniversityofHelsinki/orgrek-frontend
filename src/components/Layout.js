import React from 'react';
import Header2 from './Header2';
import SkipNavLink from './SkipNavLink';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <SkipNavLink id="main-content" />
      <Header2 />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
