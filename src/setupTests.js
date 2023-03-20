// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import React from 'react';
import { setGlobalConfig } from '@storybook/testing-react';
import { MemoryRouter } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fi } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers';

global.fetch = jest.fn();

setGlobalConfig({
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

jest.mock('./i18n');
