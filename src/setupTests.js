// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import React from 'react';
import { setProjectAnnotations } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fi } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { initI18n } from './i18n';

initI18n(false);

global.fetch = jest.fn();

setProjectAnnotations({
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
        <Story />
      </LocalizationProvider>
    ),
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
});

// Reset screen content before every test
beforeEach(() => {
  document.body.innerHTML = '';
});
