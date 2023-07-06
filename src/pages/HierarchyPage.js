import React from 'react';
import HierarchyDataGrid from '../components/admin/HierarchyDataGrid';
import { Container } from '@mui/material';

const HierarchyPage = () => {
  return (
    <Container sx={{ pt: 6, pb: 6 }}>
      {' '}
      <HierarchyDataGrid />{' '}
    </Container>
  );
};

export default HierarchyPage;
