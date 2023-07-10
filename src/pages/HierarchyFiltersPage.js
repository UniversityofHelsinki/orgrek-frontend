import React, { useMemo } from 'react';
import Container from '@mui/material/Container';
import HierarchyFiltersDataGrid from '../components/admin/HierarchyFiltersDataGrid';
import {
  showNotification,
  useGetHierarchyFiltersQuery,
  useSaveHierarchyFiltersMutation,
  useInsertHierarchyFiltersMutation,
  useDeleteHierarchyFiltersMutation,
  useGetSectionAttributesQuery,
  useGetEdgeHierarchiesQuery,
  useGetHierarchyTypesQuery,
} from '../store';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

const HierarchyFiltersPage = () => {
  const dispatch = useDispatch();
  const { data: hierarchyFilters, isFetching: isFetchingHierarchyFilters } =
    useGetHierarchyFiltersQuery();
  const { data: attributeKeys, isFetching: isFetchingKeys } =
    useGetSectionAttributesQuery();
  const { data: selectableHierarchies, isFetching: isFetchingEdges } =
    useGetHierarchyTypesQuery();
  const { data: edgeHierarchies, isFetching: isFetchingEdgeHierarchies } =
    useGetEdgeHierarchiesQuery();
  const [saveHierarchyFilters] = useSaveHierarchyFiltersMutation();
  const [deleteHierarchyFilters] = useDeleteHierarchyFiltersMutation();
  const [insertHierarchyFilters] = useInsertHierarchyFiltersMutation();

  const loading =
    isFetchingHierarchyFilters || isFetchingEdges || isFetchingEdgeHierarchies;

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

  const handleAddRow = async (row) => {
    //const id = Math.floor(Math.random() * -1000000);
    //console.log('handleAddRow', row); // TODO: dispatch addHierarchyFilters mutation
    try {
      await insertHierarchyFilters({ data: [row] }).unwrap();
      dispatch(
        showNotification({
          message: t('hierarchyFilters.insertSuccess'),
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: t('hierarchyFilters.insertError'),
          severity: 'error',
        })
      );
    }
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
        selectableHierarchies={selectableHierarchies}
        edgeHierarchies={edgeHierarchies}
        attributeKeys={attributeKeys}
        loading={loading}
        onRowChange={handleRowChange}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
      />
    </Container>
  );
};

export default HierarchyFiltersPage;
