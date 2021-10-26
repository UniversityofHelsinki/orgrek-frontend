import * as React from 'react';
import { render, screen, fireEvent } from './testUtils';
import Dropdown from '../src/components/Dropdown';
import * as reactRedux from 'react-redux';
import userEvent from '@testing-library/user-event';

jest.spyOn(reactRedux, 'useDispatch');

jest.mock('../src/actions/treeAction', () => ({
    __esModule: true,
    fetchSelectableHierarchies: jest.fn(() => { return  {
        type: 'SUCCESS_API_GET_SELECTABLE_HIERARCHIES',
        payload: [
        "tutkimus",
        "henkilosto",
        "toiminnanohjaus",
        "opetus",
        "history",
        "talous"
        ]
    }})
}));

test('Dropdown renders', () => {    
    render(<Dropdown />);
    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeDefined();
});

test("Dropdown does not display history as an option", () => {    
    render(<Dropdown />);
    const talousInput = screen.getByText(/talous/i);
    expect(talousInput).toBeInTheDocument;
    userEvent.click(talousInput);
    expect(screen.getByText(/opetus/i)).toBeInTheDocument;
    expect(() => screen.getByText(/history/i)).toThrow('Unable to find an element');
});

test('Dropdown selection can be chaged', () => {
    render(<Dropdown />);
    let input = screen.getByRole("textbox", { hidden: true });
    expect(input.value).toEqual("talous");
    const talousInput = screen.getByText(/talous/i);
    expect(talousInput).toBeInTheDocument;
    userEvent.click(talousInput);
    const opetusInput = screen.getByText(/opetus/i);
    userEvent.click(opetusInput);
    input = screen.getByRole("textbox", { hidden: true });
    expect(input.value).toEqual("opetus");
});