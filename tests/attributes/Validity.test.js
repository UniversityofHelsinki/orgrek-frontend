import React from 'react';
import { render, screen } from '@testing-library/react';
import * as stories from '../../src/stories/components/attributes/Validity.stories';
import { composeStories } from '@storybook/react';

const { Default, From, Until, Undefined } = composeStories(stories);

test('start and end dates defined', () => {
  render(<Default />);
  expect(screen.getByTestId('validity')).toHaveTextContent(
    '1.1.2022 - 31.12.2022'
  );
});

test('valid from', () => {
  render(<From />);
  expect(screen.getByTestId('validity')).toHaveTextContent('1.1.2022 alkaen');
});

test('valid until', () => {
  render(<Until />);
  expect(screen.getByTestId('validity')).toHaveTextContent('31.12.2022 asti');
});

test('undefined', () => {
  render(<Undefined />);
  expect(screen.getByTestId('validity')).toHaveTextContent(
    'Voimassaoloa ei määritetty'
  );
});
