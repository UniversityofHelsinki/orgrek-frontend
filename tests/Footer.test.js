import * as React from 'react';
import { render } from './testUtils';
import Footer from '../src/components/Footer';

test('Footer renders', () => {
  const { container } = render(<Footer />);
  const footer = container.getElementsByClassName('hy-footer');
  expect(footer).toBeDefined();
});
