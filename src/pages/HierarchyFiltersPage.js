import React, { useMemo } from 'react';
import Container from '@mui/material/Container';
import HierarchyFiltersDataGrid from '../components/admin/HierarchyFiltersDataGrid';
import {
  showNotification,
  useGetHierarchyFiltersQuery,
  useSaveHierarchyFiltersMutation,
  useDeleteHierarchyFiltersMutation,
} from '../store';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';

const HierarchyFiltersPage = () => {
  const dispatch = useDispatch();
  const { data: hierarchyFilters, isFetching: isFetchingHierarchyFilters } =
    useGetHierarchyFiltersQuery();
  const [saveHierarchyFilters] = useSaveHierarchyFiltersMutation();
  const [deleteHierarchyFilters] = useDeleteHierarchyFiltersMutation();
  const loading = isFetchingHierarchyFilters;

  const handleRowChange = async (row) => {
    //console.log('handleRowChange', row); // TODO: dispatch saveHierarchyFilters mutation
    try {
      await saveHierarchyFilters({ data: row }).unwrap();
      dispatch(
        showNotification({
          message: t('hierarchyFilters.saveSuccess'),
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: t('hierarchyFilters.saveError'),
          severity: 'error',
        })
      );
    }
  };

  const handleAddRow = (row) => {
    const id = Math.floor(Math.random() * -1000000);
    //console.log('handleAddRow', row); // TODO: dispatch addHierarchyFilters mutation
  };

  const handleDeleteRow = async (row) => {
    //console.log('handleDeleteRow', row); // TODO: dispatch deleteHierarchyFilters mutation
    try {
      await deleteHierarchyFilters({ data: row }).unwrap();
      dispatch(
        showNotification({
          message: t('hierarchyFilters.deleteSuccess'),
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: t('hierarchyFilters.deleteError'),
          severity: 'error',
        })
      );
    }
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
