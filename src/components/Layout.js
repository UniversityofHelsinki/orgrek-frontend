import React from 'react';
import SkipNavLink from './SkipNavLink';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Notification from './Notification';

const Layout = () => {
  return (
    <>
      <SkipNavLink id="main-content" />
      <Header />
      <Outlet />
      <Footer />
      <Notification />
    </>
  );
};

export default Layout;
