import * as React from 'react';
import { renderStory, screen } from './testUtils';
import * as HeaderStories from '../src/stories/components/Header.stories';

describe('navigation', () => {
  test('expect texts navigation to be visible for admin role', () => {
    renderStory(HeaderStories.AdminRole);
    expect(screen.queryByText('texts')).toBeVisible();
  });
  test('expect texts navigation to not be visible for reader role', () => {
    renderStory(HeaderStories.ReaderRole);
    expect(screen.queryByText('texts')).not.toBeVisible();
  });
});
