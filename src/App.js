import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { fetchUser } from './actions/userAction';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTranslation } from 'react-i18next';
import Routes from './pages/Routes';
import LoginRedirect from './components/LoginRedirect';
import { getDateFnsLocale } from './utils/dateUtils';
import changeLocale from './hooks/useLocale';
import useCurrentUser from './hooks/useCurrentUser';

const SHIBBOLETH_LOGIN = process.env.REACT_APP_ORGREK_LOGIN;

const App = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useCurrentUser();

  useEffect(() => {
    dispatch(fetchUser());
    changeLocale(user);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={getDateFnsLocale(i18n.language)}
        localeText={{
          todayButtonLabel: t('return_to_today'),
        }}
      >
        <LoginRedirect loginUrl={SHIBBOLETH_LOGIN} />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
