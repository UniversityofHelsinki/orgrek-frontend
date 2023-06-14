import React from 'react';
import LoadingOverlayComponent from '../../components/LoadingOverlay';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default {
  component: LoadingOverlayComponent,
};

export const LoadingOverlay = {
  args: {
    loading: true,
  },
  render: ({ loading }) => {
    return (
      <Box sx={{ width: 400, padding: 2, position: 'relative' }}>
        <Typography>
          Donec turpis sapien, tincidunt sed faucibus placerat, porta fermentum
          erat. Suspendisse congue risus sem, sit amet posuere augue egestas
          vitae. Curabitur venenatis dolor id cursus tempus. Quisque suscipit
          lacinia faucibus. Suspendisse elementum, ligula nec scelerisque
          egestas, nisi felis consequat quam, ut rutrum quam velit in est.
          Praesent dictum auctor dapibus. Curabitur semper sit amet arcu
          fermentum vestibulum. Aenean non bibendum neque. Aliquam venenatis
          dolor quis laoreet varius. Nulla sit amet felis justo.
        </Typography>
        <Box
          sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {loading && <LoadingOverlayComponent />}
        </Box>
      </Box>
    );
  },
};
