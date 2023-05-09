import React from 'react';
import Button from '../../../components/inputs/Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Button,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined'],
    },
  },
};

export const Primary = {
  args: {
    variant: 'contained',
    text: 'Button',
    disabled: false,
    loading: false,
  },
  render: ({ text, ...args }) => <Button {...args}>{text}</Button>,
};

export const Secondary = {
  ...Primary,
  args: {
    ...Primary.args,
    variant: 'outlined',
  },
};

export const Text = {
  ...Primary,
  args: {
    ...Primary.args,
    variant: 'text',
  },
};
