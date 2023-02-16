import * as React from 'react';
import { render } from './testUtils';
import SelectDate from '../src/components/SelectDate';

test('SelectDate renders', () => {
  const { container } = render(<SelectDate />);
  const selectDate = container.getElementsByClassName(
    'react-datepicker__input-container'
  );
  expect(selectDate).toBeDefined();
});

test('return to today button renders', () => {
  const { container } = render(<SelectDate />);
  const returnToTodayButton =
    container.getElementsByClassName('returnTodayButton');
  expect(returnToTodayButton).toBeDefined();
});
