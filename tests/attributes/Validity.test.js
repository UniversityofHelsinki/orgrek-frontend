import React from 'react';
import { render, screen } from '@testing-library/react';
import * as stories from '../../src/stories/components/attributes/Validity.stories';
import { composeStories } from '@storybook/testing-react';
import i18n from '../../src/i18n';

const { Default, From, Until, Undefined } = composeStories(stories);

let originalLanguage;

beforeEach(() => {
  originalLanguage = i18n.language;
  i18n.changeLanguage('fi');
});

afterEach(() => {
  i18n.language = originalLanguage;
});

test('start and end dates defined', () => {
  render(<Default />);
  expect(screen.getByTestId('validity')).toHaveTextContent(
    '1.1.2022 - 31.12.2022'
  );
});

test('valid from', () => {
  render(<From />);
  expect(screen.getByTestId('validity')).toHaveTextContent(
    '1.1.2022 from_date_react'
  );
});

test('valid until', () => {
  render(<Until />);
  expect(screen.getByTestId('validity')).toHaveTextContent(
    '31.12.2022 until_date_react'
  );
});

test('undefined', () => {
  render(<Undefined />);
  expect(screen.getByTestId('validity')).toHaveTextContent('not_specified');
});
