import * as React from 'react';
import { render } from './testUtils';
import Header from '../src/components/Header';

jest.mock('react-i18next', () => ({
    useTranslation: () => ( { t: key => key } )
}));

test('Header renders', () => {
    const { container } = render(<Header />);
    const header = container.getElementsByClassName('navbar');
    expect(header).toBeDefined();
});
