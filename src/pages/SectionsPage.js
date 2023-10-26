import React, { useMemo } from 'react';
import SectionsDataGrid from '../components/admin/SectionsDataGrid';
import Container from '@mui/material/Container';
import {
  showNotification,
  useDeleteSectionAttributeMutation,
  useGetHierarchyFiltersQuery,
  useGetSectionAttributesQuery,
  useInsertSectionAttributeMutation,
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
  const [insertSectionAttribute] = useInsertSectionAttributeMutation();

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
          message: t('sectionInfo.updateSuccess'),
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: t('sectionInfo.updateError'),
          severity: 'error',
        })
      );
    }
  };

  const handleAddRow = async (row) => {
    try {
      await insertSectionAttribute({ data: row }).unwrap();
      dispatch(
        showNotification({
          message: t('sectionInfo.insertSuccess'),
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: t('sectionInfo.insertError'),
          severity: 'error',
        })
      );
    }
  };

  const handleDeleteRow = async (row) => {
    try {
      await deleteSectionAttribute({ id: row.id }).unwrap();
      dispatch(
        showNotification({
          message: t('sectionInfo.deleteSuccess'),
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: t('sectionInfo.deleteError'),
          severity: 'error',
        })
      );
    }
  };

  return (
    <Container sx={{ pt: 6, pb: 6 }} id="main-content" tabIndex="-1">
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
