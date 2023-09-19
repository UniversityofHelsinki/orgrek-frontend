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
import { stringComparator } from './fieldComparator';
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

const HierarchyDataGrid = ({
  hierarchies = [],
  loading,
  handleSubmit,
  handleUpdate,
}) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [openForm, setOpenForm] = useState(false);

  const columns = [
    {
      field: 'hierarchy',
      headerName: t(`hierarchy_column_hierarchy`),
      flex: 1,
      valueFormatter: (row) => t(row.value),
      sortComparator: (a, b) => stringComparator(t(a), t(b)),
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
      sortComparator: (a, b) => stringComparator(t(a), t(b)),
    },
  ];

  const openDialog = () => {
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  const updateRow = async (row) => {
    await handleUpdate(row);
    return row;
  };

  const insertRow = async (row) => {
    await handleSubmit(row);
    closeForm();
  };

  const localeTextOverrides = {
    // see the keys here if you want to override data grid's inner translations:
    // https://github.com/mui/mui-x/blob/HEAD/packages/grid/x-data-grid/src/constants/localeTextConstants.ts
    toolbarColumns: t('datagrid_toolbar_columns'),
    toolbarFilters: t('datagrid_toolbar_filters'),
    toolbarDensity: t('datagrid_toolbar_density'),
    toolbarExport: t('datagrid_toolbar_export'),
  };

  const hierarchyIdentifiers = hierarchies.map(
    (hierarchy) => hierarchy.hierarchy
  );

  return (
    <>
      <DataGrid
        autoHeight
        columns={columns}
        rows={hierarchies}
        loading={loading}
        processRowUpdate={(params) => updateRow(params)}
        onProcessRowUpdateError={console.log}
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
      {openForm && (
        <HierarchyForm
          hierarchies={hierarchyIdentifiers}
          open={openForm}
          onClose={closeForm}
          handleSubmit={insertRow}
        />
      )}
    </>
  );
};

export default HierarchyDataGrid;
