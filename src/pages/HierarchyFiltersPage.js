import React, { useMemo } from 'react';
import Container from '@mui/material/Container';
import { useGetHierarchyFiltersQuery } from '../store';
import HierarchyFiltersDataGrid from '../components/admin/HierarchyFiltersDataGrid';

const HierarchyFiltersPage = () => {
  const { data: hierarchyFilters, isFetching: isFetchingHierarchyFilters } =
    useGetHierarchyFiltersQuery();

  const loading = isFetchingHierarchyFilters;

  const handleRowChange = (row) => {
    console.log('handleRowChange', row); // TODO: dispatch saveHierarchyFilters mutation
  };

  const handleAddRow = (row) => {
    const id = Math.floor(Math.random() * -1000000);
    //console.log('handleAddRow', row); // TODO: dispatch addHierarchyFilters mutation
  };

  const handleDeleteRow = (row) => {
    console.log('handleDeleteRow', row); // TODO: dispatch deleteHierarchyFilters mutation
  };

  return (
    <Container sx={{ pt: 6, pb: 6 }}>
      <HierarchyFiltersDataGrid
        initialRows={hierarchyFilters}
        loading={loading}
        onRowChange={handleRowChange}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
      />
    </Container>
  );
};

export default HierarchyFiltersPage;
