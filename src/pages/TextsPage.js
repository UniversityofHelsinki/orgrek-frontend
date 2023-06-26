import React, { useMemo } from 'react';
import Container from '@mui/material/Container';
import { useGetTextAttributesQuery } from '../store';
import TextsDataGrid from '../components/admin/TextsDataGrid';

const TextsPage = () => {
  const { data: textAttributes, isFetching: isFetchingSectionAttributes } =
    useGetTextAttributesQuery();

  const loading = isFetchingSectionAttributes;

  const handleRowChange = (row) => {
    console.log('handleRowChange', row); // TODO: dispatch saveTextAttribute mutation
  };

  const handleAddRow = (row) => {
    console.log('handleAddRow', row); // TODO: dispatch addTextAttribute mutation
  };

  const handleDeleteRow = (row) => {
    console.log('handleDeleteRow', row); // TODO: dispatch deleteTextAttribute mutation
  };

  return (
    <Container sx={{ pt: 6, pb: 6 }}>
      <TextsDataGrid
        initialRows={textAttributes}
        loading={loading}
        onRowChange={handleRowChange}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
      />
    </Container>
  );
};

export default TextsPage;
