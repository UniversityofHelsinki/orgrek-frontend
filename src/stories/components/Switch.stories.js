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
        <label htmlFor="medium">Switch</label>
        <Switch {...args} id="medium" />
        <label htmlFor="medium-checked">Checked Switch</label>
        <Switch {...args} checked={true} id="medium-checked" />
        <label htmlFor="medium-disabled">Disabled Switch</label>
        <Switch {...args} disabled={true} id="medium-disabled" />
        <label htmlFor="medium-checked-disabled">
          Checked and disabled Switch
        </label>
        <Switch
          {...args}
          checked={true}
          disabled={true}
          id="medium-checked-disabled"
        />
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
        <label htmlFor="small">Small Switch</label>
        <Switch {...args} id="small" />
        <label htmlFor="small-checked">Checked small switch</label>
        <Switch {...args} checked={true} id="small-checked" />
        <label htmlFor="small-disabled">Disabled switch</label>
        <Switch {...args} disabled={true} id="small-disabled" />
        <label htmlFor="small-checked-disabled">
          Checked and disabled switch
        </label>
        <Switch
          {...args}
          checked={true}
          disabled={true}
          id="small-checked-disabled"
        />
      </>
    );
  },
};
