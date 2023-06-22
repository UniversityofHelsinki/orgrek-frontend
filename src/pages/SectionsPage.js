import React, { useMemo } from 'react';
import SectionsDataGrid from '../components/admin/SectionsDataGrid';
import Container from '@mui/material/Container';
import {
  showNotification,
  useDeleteSectionAttributeMutation,
  useGetHierarchyFiltersQuery,
  useGetSectionAttributesQuery,
  useUpdateSectionAttributeMutation,
} from '../store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const SectionsPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { data: hierarchyFilters, isFetching: isFetchingHierarchyFilters } =
    useGetHierarchyFiltersQuery();
  const { data: sectionAttributes, isFetching: isFetchingSectionAttributes } =
    useGetSectionAttributesQuery();

  const [updateSectionAttribute] = useUpdateSectionAttributeMutation();
  const [deleteSectionAttribute] = useDeleteSectionAttributeMutation();

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

  const handleRowChange = async (row) => {
    try {
      await updateSectionAttribute({ data: row }).unwrap();
      dispatch(
        showNotification({
          message: t('sections.updateSuccess'),
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: t('sections.updateError'),
          severity: 'error',
        })
      );
    }
  };

  const handleAddRow = (row) => {
    console.log('handleAddRow', row); // TODO: dispatch addSectionAttribute mutation
  };

  const handleDeleteRow = async (row) => {
    try {
      await deleteSectionAttribute({ id: row.id }).unwrap();
      dispatch(
        showNotification({
          message: t('sections.deleteSuccess'),
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: t('sections.deleteError'),
          severity: 'error',
        })
      );
    }
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
