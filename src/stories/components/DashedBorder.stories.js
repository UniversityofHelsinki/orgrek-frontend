import React from 'react';
import DashedBorderComponent from '../../components/DashedBorder';
import Box from '@mui/material/Box';

export default {
  component: DashedBorderComponent,
};

export const DashedBorder = {
  render: () => (
    <Box
      height={150}
      width={150}
      position="relative"
      backgroundColor="background.paper"
      padding={2}
    >
      <DashedBorderComponent />
    </Box>
  ),
};
