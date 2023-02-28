import * as React from 'react';
import { renderStory, screen } from './testUtils';
import Meta, * as HeaderStories from '../src/stories/components/Header.stories';

describe('navigation', () => {
  test.skip('expect texts navigation to be visible for admin role', () => {
    renderStory(HeaderStories.AdminRole, Meta);
    expect(screen.queryByText('texts')).toBeVisible();
  });
  test.skip('expect texts navigation to not be visible for reader role', () => {
    renderStory(HeaderStories.ReaderRole, Meta);
    expect(screen.queryByText('texts')).not.toBeVisible();
  });
});
