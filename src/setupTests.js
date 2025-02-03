// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import { initI18n } from './i18n';

initI18n(false);

global.fetch = jest.fn();

// Reset screen content before every test
beforeEach(() => {
  document.body.innerHTML = '';
});
