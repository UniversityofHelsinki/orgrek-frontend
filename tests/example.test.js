import React from 'react';
import { screen, render } from './testUtils';
import userReducer from '../src/reducers/treeReducer';
import userEvent from '@testing-library/user-event';

test('renders a div with awesome text', () => {
    render(<div>Awesome text</div>);

    const awesomeElement = screen.getByText(/Awesome text/i);

    expect(awesomeElement).toBeInTheDocument;
});


test('should return the initial tree state', () => {
    expect(userReducer(undefined, {})).toEqual(
        {
            defaultHierarchy: 'talous',
            tree : {},
            selectedHierarchy: undefined,
            selectableHierarchies: [],
            treeWithAllHierarchies: {}
            selectableHierarchies: [],
            selectedHierarchies: [],
        }
    );
});

test('clicks a button', () => {
    const clickFunction = jest.fn();
    render(<button onClick={clickFunction}>Click Me</button>);
    const button = screen.getByText(/Click Me/i);

    expect(button).toBeInTheDocument;

    userEvent.click(button);
    userEvent.click(button);

    expect(clickFunction).toHaveBeenCalledTimes(2);
});
