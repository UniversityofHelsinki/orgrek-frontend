import React from 'react';
import { render, screen } from '@testing-library/react';
import * as stories from '../src/stories/components/Header.stories';
import { composeStories } from '@storybook/testing-react';

const { AdminRole, ReaderRole } = composeStories(stories);

describe('navigation', () => {
  test('expect texts navigation to be visible for admin role', () => {
    render(<AdminRole />);
    expect(screen.queryByText('Tekstit')).toBeInTheDocument();
  });

  test('expect texts navigation to not be visible for reader role', () => {
    render(<ReaderRole />);
    expect(screen.queryByText('Tekstit')).not.toBeInTheDocument();
  });
});
