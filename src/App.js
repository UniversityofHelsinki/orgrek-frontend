import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { fetchUser } from './actions/userAction';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Routes from './pages/Routes';
import LoginRedirect from './components/LoginRedirect';
import useCurrentUser from './hooks/useCurrentUser';
import { changeLanguage } from './components/LanguageSelect';

const SHIBBOLETH_LOGIN = process.env.REACT_APP_ORGREK_LOGIN;

const App = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useCurrentUser();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await changeLanguage(user, i18n);
    };
    fetchData() // make sure to catch any error
      .catch(console.error);
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <LoginRedirect loginUrl={SHIBBOLETH_LOGIN} />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
