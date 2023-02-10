import * as React from 'react';
import { render } from './testUtils';
import Footer from '../src/components/Footer';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('Footer renders', () => {
  const { container } = render(<Footer />);
  const footer = container.getElementsByClassName('hy-footer');
  expect(footer).toBeDefined();
});
