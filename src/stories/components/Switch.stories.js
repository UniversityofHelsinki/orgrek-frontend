import React from 'react';
import { Switch } from '@mui/material';

export default {
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: 'MUI Switch customized with HY Design System styles',
      },
    },
  },
};

export const MediumSwitch = {
  args: {
    size: 'medium',
  },
  render: (args) => {
    return (
      <>
        <Switch {...args} />
        <Switch {...args} checked={true} />
        <Switch {...args} disabled={true} />
        <Switch {...args} checked={true} disabled={true} />
      </>
    );
  },
};

export const SmallSwitch = {
  args: {
    size: 'small',
  },
  render: (args) => {
    return (
      <>
        <Switch {...args} />
        <Switch {...args} checked={true} />
        <Switch {...args} disabled={true} />
        <Switch {...args} checked={true} disabled={true} />
      </>
    );
  },
};
