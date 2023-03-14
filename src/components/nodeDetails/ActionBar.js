import Stack from '@mui/material/Stack';
import React from 'react';

const ActionBar = ({ children }) => (
  <Stack direction="row" justifyContent="flex-end" spacing={2}>
    {children}
  </Stack>
);

export default ActionBar;
