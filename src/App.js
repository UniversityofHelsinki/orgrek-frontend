import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { fetchUser } from './actions/userAction';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fi, sv, enIE } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import Routes from './pages/Routes';

const getDateFnsLocale = (language) => {
  switch (language) {
    case 'fi':
      return fi;
    case 'sv':
      return sv;
    default:
      return enIE;
  }
};

const App = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={getDateFnsLocale(i18n.language)}
      >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
