import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

/**
 * Place this component inside another component to create a dashed border
 * around the parent. The parent must have 'position: relative' style.
 */
const DashedBorder = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <svg width="100%" height="100%">
        <rect
          width="100%"
          height="100%"
          fill="none"
          stroke={theme.palette.divider}
          strokeWidth="3"
          strokeDasharray="6, 14"
          strokeDashoffset="0"
          strokeLinecap="square"
        />
      </svg>
    </Box>
  );
};

export default DashedBorder;
