import React, { Suspense } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { DocsContainer } from '@storybook/addon-docs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fi } from 'date-fns/locale';
import theme from '../src/theme';
import { Provider } from 'react-redux';
import store from '../src/store';
import { withRouter } from 'storybook-addon-react-router-v6';
import '../src/i18n';

// These Bootstrap styles are needed only for legacy components and can be
// removed after everything has been migrated to Material UI
import '../src/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

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
  a11y: {
    options: {
      // See: https://www.deque.com/axe/core-documentation/api-documentation/#axe-core-tags
      runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
    },
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
  // react-i18next uses suspense by default, this decorator can be removed
  // if react.useSuspense is disabled in i18next init
  (Story) => (
    <Suspense fallback="Loading…">
      <Story />
    </Suspense>
  ),
  withRouter,
];
