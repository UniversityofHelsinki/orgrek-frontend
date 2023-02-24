import React from 'react';
import LoginRedirect from './LoginRedirect';
import Header2 from './Header2';
import SkipNavLink from './SkipNavLink';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const SHIBBOLETH_LOGIN = process.env.REACT_APP_ORGREK_LOGIN;

const Layout = () => {
  return (
    <div className="App">
      <LoginRedirect loginUrl={SHIBBOLETH_LOGIN} />
      <SkipNavLink id="main-content" />
      <Header2 />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
