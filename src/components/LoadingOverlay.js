import React from 'react';
import Paper from '@mui/material/Paper';
import Placeholder from './Placeholder';
import Spinner from './Spinner';

/**
 * Spinner overlay for DataGrid but could be reusable in other components too.
 */
const LoadingOverlay = () => (
  <Paper
    elevation={0}
    sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    }}
  >
    <Placeholder
      empty
      align="center"
      placeholder={<Spinner sx={{ fontSize: 32 }} />}
    />
  </Paper>
);

export default LoadingOverlay;
