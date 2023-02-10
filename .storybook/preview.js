import { CssBaseline, ThemeProvider } from '@mui/material';
import { DocsContainer } from '@storybook/addon-docs';
import theme from '../src/theme';

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DocsContainer {...props} />
      </ThemeProvider>
    ),
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];
