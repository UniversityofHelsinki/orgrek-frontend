import React, { useMemo } from 'react';
import Container from '@mui/material/Container';
import HierarchyFiltersDataGrid from '../components/admin/HierarchyFiltersDataGrid';
import {
  showNotification,
  useGetHierarchyFiltersQuery,
  useSaveHierarchyFiltersMutation,
  useInsertHierarchyFiltersMutation,
  useDeleteHierarchyFiltersMutation,
  useGetEdgeHierarchiesQuery,
  useGetDistinctNodeAttributesQuery,
  useGetDistinctSectionAttributesQuery,
  useGetHierarchyTypesQuery,
} from '../store';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';

const HierarchyFiltersPage = () => {
  const dispatch = useDispatch();
  const { data: hierarchyFilters, isFetching: isFetchingHierarchyFilters } =
    useGetHierarchyFiltersQuery();
  const { data: attributeKeys, isFetching: isFetchingKeys } =
    useGetDistinctSectionAttributesQuery();
  const { data: selectableHierarchies, isFetching: isFetchingEdges } =
    useGetHierarchyTypesQuery();
  const { data: edgeHierarchies, isFetching: isFetchingEdgeHierarchies } =
    useGetEdgeHierarchiesQuery();
  const { data: distinctNodeAttrs, isFetching: isFetchingDistinctAttr } =
    useGetDistinctNodeAttributesQuery();
  const [saveHierarchyFilters] = useSaveHierarchyFiltersMutation();
  const [deleteHierarchyFilters] = useDeleteHierarchyFiltersMutation();
  const [insertHierarchyFilters] = useInsertHierarchyFiltersMutation();

  const loading =
    isFetchingHierarchyFilters ||
    isFetchingEdges ||
    isFetchingEdgeHierarchies ||
    isFetchingDistinctAttr;

  const handleRowChange = async (row) => {
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
    <Container sx={{ pt: 6, pb: 6 }} id="main-content" tabIndex="-1">
      <HierarchyFiltersDataGrid
        initialRows={hierarchyFilters}
        selectableHierarchies={selectableHierarchies}
        distinctNodeAttrs={distinctNodeAttrs}
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
