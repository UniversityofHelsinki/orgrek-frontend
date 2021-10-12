import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/store';
import { screen, render } from '@testing-library/react';

test('renders a div with awesome text', () => {
    render(<Provider store={store}><div>Awesome text</div></Provider>);

    const awesomeElement = screen.getByText(/Awesome text/i);

    expect(awesomeElement).toBeInTheDocument;
});
