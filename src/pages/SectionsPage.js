import React, { useMemo } from 'react';
import SectionsDataGrid from '../components/admin/SectionsDataGrid';
import Container from '@mui/material/Container';
import {
  useGetHierarchyFiltersQuery,
  useGetSectionAttributesQuery,
} from '../store';

const SectionsPage = () => {
  const { data: hierarchyFilters, isFetching: isFetchingHierarchyFilters } =
    useGetHierarchyFiltersQuery();
  const { data: sectionAttributes, isFetching: isFetchingSectionAttributes } =
    useGetSectionAttributesQuery();

  const loading = isFetchingHierarchyFilters || isFetchingSectionAttributes;

  const attributeKeys = useMemo(
    () =>
      (hierarchyFilters || [])
        .filter(
          (row, index, rows) =>
            index === rows.findIndex((r) => r.key === row.key)
        )
        .map((row) => row.key),
    [hierarchyFilters]
  );

  const handleRowChange = (row) => {
    console.log('handleRowChange', row); // TODO: dispatch saveSectionAttribute mutation
  };

  const handleAddRow = (row) => {
    console.log('handleAddRow', row); // TODO: dispatch addSectionAttribute mutation
  };

  const handleDeleteRow = (row) => {
    console.log('handleDeleteRow', row); // TODO: dispatch deleteSectionAttribute mutation
  };

  return (
    <Container sx={{ pt: 6, pb: 6 }}>
      <SectionsDataGrid
        initialRows={sectionAttributes}
        attributeKeys={attributeKeys}
        loading={loading}
        onRowChange={handleRowChange}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
      />
    </Container>
  );
};

export default SectionsPage;
