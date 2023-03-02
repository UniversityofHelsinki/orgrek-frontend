import React from 'react';
import SkipNavLink from './SkipNavLink';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <SkipNavLink id="main-content" />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
