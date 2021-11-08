import * as React from 'react';
import { render } from './testUtils';
import SelectDate from '../src/components/SelectDate';


test('SelectDate renders', () => {
    const { container } = render(<SelectDate />);
    const dropdown = container.getElementsByClassName('react-datepicker__input-container');
    expect(dropdown).toBeDefined();
});
