import React from 'react';
import Placeholder from '../../components/Placeholder';
import Icon from '@mui/icons-material/ErrorOutline';
import Validity from '../../components/attributes/Validity';

export default {
  component: Placeholder,
  argTypes: {
    align: {
      control: 'radio',
      options: ['left', 'center', 'right', 'justify'],
    },
  },
};

export const TextPlaceholder = {
  args: {
    empty: true,
    placeholder: 'Placeholder text',
    align: 'center',
  },
  render: (args) => <Placeholder {...args}>Content if not empty</Placeholder>,
};

export const ComponentPlaceholder = {
  args: {
    empty: true,
    align: 'center',
  },
  render: (args) => (
    <Placeholder {...args} placeholder={<Icon />}>
      Content if not empty
    </Placeholder>
  ),
};

export const ValidityPlaceholder = {
  args: {
    empty: true,
    align: 'center',
  },
  render: (args) => (
    <Placeholder {...args} placeholder={<Validity />}>
      <Validity startDate="2023-01-01" />
    </Placeholder>
  ),
};
