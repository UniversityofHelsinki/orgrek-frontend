import {
  DataGrid,
  enUS,
  fiFI,
  GridActionsCellItem,
  svSE,
} from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authActions } from '../../auth';
import AttributeOrderForm from '../nodeDetails/AttributeOrderForm';
import actionsColumnType from './actionsColumnType';
import { stringComparator } from './fieldComparator';
import DeleteIcon from '@mui/icons-material/Delete';
import GridToolbar from './GridToolbar';

const AttributeOrdersDataGrid = ({
  rows = [],
  attributes = {},
  loading,
  onSubmit,
  onDelete,
  onUpdate,
}) => {
  const [showForm, setShowForm] = useState(false);

  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const processRowUpdate = async (updatedRow, oldRow) => {
    if (updatedRow) {
      await onUpdate({ old: oldRow, updated: updatedRow });
    }
    return updatedRow;
  };

  const attributeKeys = Object.keys(attributes).map((key) => ({
    value: key,
    label: t(key),
    key,
  }));

  const columns = [
    {
      field: 'key',
      headerName: t('attribute_orders_key'),
      flex: 1,
      valueFormatter: ({ value }) => t(value),
      sortComparator: (a, b) => stringComparator(t(a), t(b)),
      editable: true,
      type: 'singleSelect',
      valueOptions: attributeKeys,
    },
    {
      field: 'value',
      headerName: t('attribute_orders_value'),
      flex: 1,
      type: 'singleSelect',
      valueOptions: ({ row }) =>
        (attributes[row.key] || []).map((value) => ({
          value,
          label: t(value),
          key: value,
        })),
      valueFormatter: ({ value }) => t(value),
      sortComparator: (a, b) => stringComparator(t(a), t(b)),
      editable: true,
    },
    {
      field: 'order',
      headerName: t('attribute_orders_order'),
      flex: 1,
      editable: true,
    },
    {
      ...actionsColumnType,
      headerName: t('dataGrid.actionsHeader'),
      getActions: (params) => {
        return [
          <GridActionsCellItem
            key="deleteRow"
            icon={<DeleteIcon />}
            onClick={() => onDelete(params.row)}
            label={t('dataGrid.deleteRow')}
            showInMenu
          />,
        ];
      },
    },
  ];

  const formElement = (
    <AttributeOrderForm
      open={showForm}
      onClose={() => setShowForm(false)}
      existingRows={rows || []}
      attributes={attributes}
      onSubmit={onSubmit}
    />
  );

  const localeTextOverrides = {
    // see the keys here if you want to override data grid's inner translations:
    // https://github.com/mui/mui-x/blob/HEAD/packages/grid/x-data-grid/src/constants/localeTextConstants.ts
    toolbarColumns: t('datagrid_toolbar_columns'),
    toolbarFilters: t('datagrid_toolbar_filters'),
    toolbarDensity: t('datagrid_toolbar_density'),
    toolbarExport: t('datagrid_toolbar_export'),
    columnMenuManageColumns: t('datagrid_column_menu_manage_columns'),
  };

  return (
    <>
      <DataGrid
        loading={loading}
        columns={columns}
        processRowUpdate={processRowUpdate}
        rows={rows.map((row, i) => ({ id: i, ...row }))}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            onAddRow: () => setShowForm(true),
            authActions: authActions.attributeorders,
          },
        }}
        localeText={
          {
            fi: {
              ...fiFI.components.MuiDataGrid.defaultProps.localeText,
              ...localeTextOverrides,
            },
            sv: {
              ...svSE.components.MuiDataGrid.defaultProps.localeText,
              ...localeTextOverrides,
            },
            en: {
              ...enUS.components.MuiDataGrid.defaultProps.localeText,
              ...localeTextOverrides,
            },
            ia: {
              ...localeTextOverrides,
            },
          }[language]
        }
      />
      {formElement}
    </>
  );
};

export default AttributeOrdersDataGrid;
