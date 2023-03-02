import { Link as RouterLink, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';

const NavLink = ({ to, text, sx }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Box
      component={RouterLink}
      to={to}
      sx={{
        height: '100%',
        color: 'divider',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        paddingX: 2,

        ...(active && {
          boxShadow: (theme) =>
            `inset 0 -4px 0 0 ${theme.palette.primary.nearlyBlack}`,
          backgroundColor: 'common.white',
        }),
        ':hover': {
          color: 'divider',
          textDecoration: 'none',
        },
        position: 'relative',
        ':focus-visible': {
          zIndex: 'tooltip',
          outline: 'none',
          backgroundColor: 'action.focus',
        },
        borderLeft: 1,
        '&:last-of-type': {
          borderRight: 1,
        },
        ...sx,
      }}
    >
      <Typography variant="mainNavigation">{text}</Typography>
    </Box>
  );
};

export default NavLink;
