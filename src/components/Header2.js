import React from 'react';
import LanguageSelect from './LanguageSelect';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

const Header2 = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={10}></Grid>
        <Grid xs={2}>
          <LanguageSelect />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header2;
