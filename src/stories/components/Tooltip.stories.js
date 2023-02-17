import React from 'react';
import TooltipComponent from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default {
  component: TooltipComponent,
};

export const Tooltip = {
  args: {
    title: 'Delete',
  },
  render: (args) => (
    <TooltipComponent {...args}>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </TooltipComponent>
  ),
};
