import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import React from 'react';

const actionsColumnType = {
  field: 'actions',
  type: 'actions',
  hideable: false,
  renderHeader: (params) => {
    return <Box sx={visuallyHidden}>{params.colDef.headerName}</Box>;
  },
};

export default actionsColumnType;
