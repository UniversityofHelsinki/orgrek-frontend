import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { DocsContainer } from '@storybook/addon-docs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fi } from 'date-fns/locale';
import theme from '../src/theme';
import { Provider } from 'react-redux';
import store from '../src/store';
import { withRouter } from 'storybook-addon-react-router-v6';

// Use the same decorators for both stories and docs pages
const CommonDecorators = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      {children}
    </LocalizationProvider>
  </ThemeProvider>
);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    container: (props) => (
      <CommonDecorators>
        <DocsContainer {...props} />
      </CommonDecorators>
    ),
  },
};

export const decorators = [
  (Story) => (
    <CommonDecorators>
      <Story />
    </CommonDecorators>
  ),
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
  withRouter,
];
