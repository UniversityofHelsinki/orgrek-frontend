import React from 'react';
import LayoutComponent from '../../components/Layout';
import { Route, Routes } from 'react-router-dom';
import { createAdmin, withUser } from '../../mockStore';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default {
  component: LayoutComponent,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Layout = {
  render: () => {
    const content = (
      <Box sx={{ pt: 8, pb: 8, minHeight: '75vh' }} id="main-content">
        <Typography align="center">Page content</Typography>
      </Box>
    );

    return (
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={content} />
        </Route>
      </Routes>
    );
  },
  decorators: [withUser(createAdmin())],
};
