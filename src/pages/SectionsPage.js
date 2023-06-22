import React, { useMemo } from 'react';
import SectionsDataGrid from '../components/admin/SectionsDataGrid';
import Container from '@mui/material/Container';
import {
  showNotification,
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
    return updateSectionAttribute({ data: row })
      .unwrap()
      .then((response) => {
        dispatch(
          showNotification({
            message: t('sections.updateSuccess'),
            severity: 'success',
          })
        );
      })
      .catch((error) => {
        dispatch(
          showNotification({
            message: t('sections.updateError'),
            severity: 'error',
          })
        );
      });
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
