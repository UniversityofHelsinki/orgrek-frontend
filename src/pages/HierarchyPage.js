import React from 'react';
import HierarchyDataGrid from '../components/admin/HierarchyDataGrid';
import { Container } from '@mui/material';
import {
  showNotification,
  useGetHierarchyPublicitiesQuery,
  useInsertHierarchyPublicityMutation,
  useUpdateHierarchyPublicityMutation,
} from '../store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const HierarchyPage = () => {
  const { t } = useTranslation();
  const { data: hierarchies, isFetching } = useGetHierarchyPublicitiesQuery();
  const [insertHierarchies] = useInsertHierarchyPublicityMutation();
  const [updateHierarchy] = useUpdateHierarchyPublicityMutation();
  const dispatch = useDispatch();

  const saveHierarchy = async (hierarchy) => {
    try {
      const response = await insertHierarchies(hierarchy).unwrap();
      dispatch(
        showNotification({
          message: t('hierarchy_insert_success'),
          severity: 'success',
        })
      );
      return response;
    } catch (error) {
      dispatch(
        showNotification({
          message: t('hierarchy_insert_failure'),
          severity: 'error',
        })
      );
    }
  };

  const updateHierarchyPublicity = async (hierarchy) => {
    try {
      const response = await updateHierarchy(hierarchy).unwrap();
      dispatch(
        showNotification({
          message: t('hierarchy_update_success'),
          severity: 'success',
        })
      );
      return response;
    } catch (error) {
      dispatch(
        showNotification({
          message: t('hierarchy_update_failure'),
          severity: 'error',
        })
      );
    }
  };

  return (
    <Container sx={{ pt: 6, pb: 6 }} id="main-content" tabIndex="-1">
      <HierarchyDataGrid
        hierarchies={hierarchies}
        loading={isFetching}
        handleSubmit={saveHierarchy}
        handleUpdate={updateHierarchyPublicity}
      />
    </Container>
  );
};

export default HierarchyPage;
