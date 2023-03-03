import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen } from '@testing-library/react';
import * as stories from '../src/stories/components/EditableAccordion.stories';
import { composeStories } from '@storybook/testing-react';

const { Default, Modified, Empty } = composeStories(stories);

describe('unmodified', () => {
  test('initially expanded', () => {
    render(<Default />);
    expect(screen.queryByText('Title')).toBeVisible();
    expect(screen.queryByText('Editable content')).toBeVisible();
  });

  test('collapses when clicked', async () => {
    render(<Default />);
    await userEvent.click(screen.getByText('Title'));
    expect(screen.queryByText('Editable content')).not.toBeVisible();
  });

  test('expands when clicked', async () => {
    render(<Default />);
    await userEvent.click(screen.getByText('Title'));
    await userEvent.click(screen.getByText('Title'));
    expect(screen.queryByText('Editable content')).toBeVisible();
  });
});

describe('modified', () => {
  test('does not allow collapsing', async () => {
    render(<Modified />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  test('modified indicator', () => {
    render(<Modified />);
    expect(
      screen.queryByText('accordion.modifiedSaveBeforeClosing')
    ).toBeVisible();
  });
});

describe('empty', () => {
  render(<Empty />);
  expect(screen.queryByText('Empty placeholder text')).toBeVisible();
});
