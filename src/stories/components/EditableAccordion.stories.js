import React from 'react';
import EditableAccordion from '../../components/EditableAccordion';
import { expect } from '@storybook/jest';
import { userEvent, within, waitFor } from '@storybook/testing-library';

export default {
  component: EditableAccordion,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: true, control: 'none' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Accordion with a modified indicator. Prevents collapsing when modified.',
      },
    },
  },
};

export const Default = {
  args: {
    title: 'Title',
    defaultModified: false,
    disabled: false,
  },
  render: (args) => (
    <EditableAccordion {...args}>Editable content</EditableAccordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByText('Title')).toBeVisible();
    await expect(canvas.queryByText('Editable content')).toBeVisible();
  },
};

export const Collapsed = {
  ...Default,
  play: async (context) => {
    await Default.play(context);

    const canvas = within(context.canvasElement);

    await userEvent.click(canvas.getByText('Title'));

    await waitFor(async () => {
      await expect(canvas.queryByText('Editable content')).not.toBeVisible();
    });
  },
};

export const Modified = {
  ...Default,
  args: {
    ...Default.args,
    defaultModified: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('button')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
    await expect(canvas.queryByText(/Muokattu/)).toBeInTheDocument();
  },
};
