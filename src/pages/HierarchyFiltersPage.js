import React, { useMemo } from 'react';
import Container from '@mui/material/Container';
import {
  showNotification,
  useGetHierarchyFiltersQuery,
  useSaveHierarchyFiltersMutation,
} from '../store';
import HierarchyFiltersDataGrid from '../components/admin/HierarchyFiltersDataGrid';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';

const HierarchyFiltersPage = () => {
  const dispatch = useDispatch();
  const { data: hierarchyFilters, isFetching: isFetchingHierarchyFilters } =
    useGetHierarchyFiltersQuery();
  const [saveHierarchyFilters] = useSaveHierarchyFiltersMutation();
  const loading = isFetchingHierarchyFilters;

  const handleRowChange = (row) => {
    //console.log('handleRowChange', row); // TODO: dispatch saveHierarchyFilters mutation
    return saveHierarchyFilters({ data: row })
      .unwrap()
      .then((response) => {
        dispatch(
          showNotification({
            message: t('save_success'),
            severity: 'success',
          })
        );
      })
      .catch((error) => {
        dispatch(
          showNotification({
            message: t('save_failed'),
            severity: 'error',
          })
        );
      });
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
