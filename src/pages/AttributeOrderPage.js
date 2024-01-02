import { Container } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import AttributeOrdersDataGrid from '../components/admin/AttributeOrdersDataGrid';
import {
  showNotification,
  useDeleteAttributeOrderMutation,
  useGetAttributeOrdersQuery,
  useGetValueSortableAttributesQuery,
  useInsertAttributeOrderMutation,
  useUpdateAttributeOrderMutation,
} from '../store';

const AttributeOrderPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: attributeOrders, isFetching: loadingAttributeOrders } =
    useGetAttributeOrdersQuery();
  const { data: attributes, isFetching: loadingAttributes } =
    useGetValueSortableAttributesQuery();
  const [insertAttributeOrder] = useInsertAttributeOrderMutation();
  const [deleteAttributeOrder] = useDeleteAttributeOrderMutation();
  const [updateAttributeOrder] = useUpdateAttributeOrderMutation();

  const handleAddRow = async (row) => {
    try {
      await insertAttributeOrder({ data: row }).unwrap();
      dispatch(
        showNotification({
          message: t('attribute_order_insert_success'),
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: t('attribute_order_insert_failure'),
          severity: 'error',
        })
      );
    }
  };

  const handleDeletion = async (row) => {
    try {
      await deleteAttributeOrder({ data: row }).unwrap();
      dispatch(
        showNotification({
          message: t('attribute_order_delete_success'),
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: t('attribute_order_delete_failure'),
          severity: 'error',
        })
      );
    }
  };

  const handleUpdate = async (row) => {
    try {
      await updateAttributeOrder({ data: row }).unwrap();
      dispatch(
        showNotification({
          message: t('attribute_order_update_success'),
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: t('attribute_order_update_failure'),
          severity: 'error',
        })
      );
    }
  };

  return (
    <Container sx={{ pt: 6, pb: 6 }} id="main-content" tabIndex="-1">
      <AttributeOrdersDataGrid
        rows={attributeOrders}
        loading={loadingAttributeOrders || loadingAttributes}
        attributes={attributes}
        onSubmit={handleAddRow}
        onDelete={handleDeletion}
        onUpdate={handleUpdate}
      />
    </Container>
  );
};

export default AttributeOrderPage;
