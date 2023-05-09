import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fi } from 'date-fns/locale';
import theme from '../src/theme';
import { withRouter } from 'storybook-addon-react-router-v6';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { withMockDate } from '../src/mockStore';
import { initI18n } from '../src/i18n';

initI18n(false);

// These Bootstrap styles are needed only for legacy components and can be
// removed after everything has been migrated to Material UI
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../src/index.css';
import '../src/App.css';

// Initialize mock service worker
initialize({
  // Specify how to handle requests without a matching mock handler
  onUnhandledRequest: (request, { error }) => {
    // Allow fetching translations from the real backend
    if (
      request.url.pathname.startsWith('/api/texts/') &&
      request.method === 'GET'
    ) {
      return;
    }

    // Besides texts, real backend should never be called from Storybook,
    // so reject all non-mock requests
    if (request.url.pathname.startsWith('/api/')) {
      error();
    }

    // Let all other requests through without warning
    // including Storybook resources, Google Fonts etc.
  },
});

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: {
      options: {
        // See: https://www.deque.com/axe/core-documentation/api-documentation/#axe-core-tags
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
      },
    },
  },
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
        <Story />
      </LocalizationProvider>
    ),
    withThemeFromJSXProvider({
      themes: {
        orgrek: theme,
      },
      defaultTheme: 'orgrek',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
    withRouter,
    mswDecorator,
    withMockDate,
  ],
};

export default preview;
