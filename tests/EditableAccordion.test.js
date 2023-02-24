import userEvent from '@testing-library/user-event';
import { renderStory, screen } from './testUtils';
import {
  Default,
  Empty,
  Modified,
} from '../src/stories/components/EditableAccordion.stories';

describe('unmodified', () => {
  test('initially expanded', () => {
    renderStory(Default);
    expect(screen.queryByText('Title')).toBeVisible();
    expect(screen.queryByText('Editable content')).toBeVisible();
  });

  test('collapses when clicked', async () => {
    renderStory(Default);
    await userEvent.click(screen.getByText('Title'));
    expect(screen.queryByText('Editable content')).not.toBeVisible();
  });

  test('expands when clicked', async () => {
    renderStory(Default);
    await userEvent.click(screen.getByText('Title'));
    await userEvent.click(screen.getByText('Title'));
    expect(screen.queryByText('Editable content')).toBeVisible();
  });
});

describe('modified', () => {
  test('does not allow collapsing', async () => {
    renderStory(Modified);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  test('modified indicator', () => {
    renderStory(Modified);
    expect(
      screen.queryByText('accordion.modifiedSaveBeforeClosing')
    ).toBeVisible();
  });
});

describe('empty', () => {
  renderStory(Empty);
  expect(screen.queryByText('Empty placeholder text')).toBeVisible();
});
