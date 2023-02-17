import * as React from 'react';
import { render } from './testUtils';
import Header from '../src/components/Header';
import { BrowserRouter } from 'react-router-dom';

test('Header renders', () => {
  const { container } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const header = container.getElementsByClassName('navbar');
  expect(header).toBeDefined();
});
