import { MenuItem, Select } from '@mui/material';
import {
  DataGrid,
  fiFI,
  svSE,
  enUS,
  useGridApiContext,
} from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authActions } from '../../auth';
import GridToolbar from './GridToolbar';
import HierarchyForm from './HierarchyForm';

const EditDropDown = ({ columnName, value, id, field }) => {
  const { t } = useTranslation();
  const apiRef = useGridApiContext();
  const onChange = (event) => {
    const newValue = event.target.value;
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };
  return (
    <Select
      fullWidth
      name={columnName}
      id={`${columnName}-select`}
      value={value}
      onChange={onChange}
    >
      <MenuItem value={true}>{t(`${columnName}_true`)}</MenuItem>
      <MenuItem value={false}>{t(`${columnName}_false`)}</MenuItem>
    </Select>
  );
};

const HierarchyDataGrid = ({ hierarchies }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [openForm, setOpenForm] = useState(false);

  const columns = [
    {
      field: 'name',
      headerName: t(`hierarchy_column_hierarchy`),
      flex: 1,
      valueFormatter: (row) => t(row.value),
    },
    {
      field: 'publicity',
      headerName: t(`hierarchy_column_publicity`),
      flex: 1,
      editable: true,
      renderEditCell: (params) => {
        return (
          <EditDropDown
            columnName="publicity"
            currentValue={params.row.publicity}
            {...params}
          />
        );
      },
      valueFormatter: (row) => t(`publicity_${row.value}`),
    },
  ];

  // TODO: replace this with real data from db
  const rows = [
    {
      id: 'talous',
      name: 'talous',
      publicity: true,
      startDate: null,
    },
    {
      id: 2,
      name: 'johtoryhmat',
      publicity: false,
      startDate: '2.3.2023',
    },
  ];

  const openDialog = () => {
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  const submitRow = (row) => {
    // TODO: submit row here
    console.log(row);
  };

  const localeTextOverrides = {
    // see the keys here if you want to override data grid's inner translations:
    // https://github.com/mui/mui-x/blob/HEAD/packages/grid/x-data-grid/src/constants/localeTextConstants.ts
    toolbarColumns: t('datagrid_toolbar_columns'),
    toolbarFilters: t('datagrid_toolbar_filters'),
    toolbarDensity: t('datagrid_toolbar_density'),
    toolbarExport: t('datagrid_toolbar_export'),
  };

  return (
    <>
      <DataGrid
        autoHeight
        columns={columns}
        rows={rows}
        loading={!rows}
        onCellEditStop={(params) => submitRow(params.row)}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            onAddRow: openDialog,
            authActions: authActions.hierarchies,
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
      {openForm && <HierarchyForm open={openForm} onClose={closeForm} />}
    </>
  );
};

export default HierarchyDataGrid;
