import React from 'react';
import { screen, render } from './testUtils';
import userReducer from '../src/reducers/treeReducer';

test('renders a div with awesome text', () => {
    render(<div>Awesome text</div>);

    const awesomeElement = screen.getByText(/Awesome text/i);

    expect(awesomeElement).toBeInTheDocument;
});


test('should return the initial tree state', () => {
    expect(userReducer(undefined, {})).toEqual(
        {
            tree : {},
            selectedHierarchy: 'talous'
        }
    );
});
