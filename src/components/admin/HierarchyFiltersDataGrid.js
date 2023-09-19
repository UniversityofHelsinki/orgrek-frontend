import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import dateColumnType from './dateColumnType';
import { toDate } from '../../utils/dateUtils';
import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  svSE,
  fiFI,
  enUS,
} from '@mui/x-data-grid';
import GridToolbar from './GridToolbar';
import PropTypes from 'prop-types';
import { authActions, isAuthorized } from '../../auth';
import useCurrentUser from '../../hooks/useCurrentUser';
import actionsColumnType from './actionsColumnType';
import DeleteIcon from '@mui/icons-material/Delete';
import NewHierarchyFilterForm from '../nodeDetails/NewHierarchyFilterForm';
import fieldComparator, { stringComparator } from './fieldComparator';

const HierarchyFiltersDataGrid = ({
  initialRows,
  selectableHierarchies,
  distinctNodeAttrs,
  attributeKeys,
  loading,
  onAddRow,
  onRowChange,
  onDeleteRow,
}) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language; // 'fi' | 'sv' | 'en'
  const user = useCurrentUser();
  const [rows, setRows] = React.useState(initialRows || []);
  const editable = isAuthorized(user, authActions.hierarchyFilters.edit);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!loading) {
      setRows(initialRows);
    }
  }, [loading]);

  const hierarchyOptions = rows
    .filter(
      (row, index, rows) =>
        index === rows.findIndex((r) => r.hierarchy === row.hierarchy)
    )
    .map((row) => ({
      value: row.hierarchy,
      label: t(row.hierarchy),
    }));

  const keyOptions = rows
    .filter(
      (row, index, rows) => index === rows.findIndex((r) => r.key === row.key)
    )
    .map((row) => ({
      value: row.key || '',
      label: t(row.key || '<empty>'),
    }));

  const valueOptions = rows
    .filter(
      (row, index, rows) =>
        index === rows.findIndex((r) => r.value === row.value)
    )
    .map((row) => ({
      value: row.value || '',
      label: t(row.value || '<empty>'),
      key: row.key,
    }));

  const columns = [
    {
      field: 'hierarchy',
      headerName: t('hierarchy_filters_hierarchy'),
      flex: 1,
      editable,
      type: 'singleSelect',
      valueOptions: hierarchyOptions,
      getCreateNewLabel: (value) =>
        t('hierarchyFiltersDataGrid.newHierarchyLabel', { value }),
      valueFormatter: (row) => t(row.value),
      sortComparator: (a, b) => stringComparator(t(a), t(b)),
    },
    {
      field: 'key',
      headerName: t('hierarchy_filters_key'),
      flex: 1,
      editable,
      type: 'singleSelect',
      valueOptions: keyOptions.sort(fieldComparator('label')),
      getCreateNewLabel: (value) =>
        t('hierarchyFiltersDataGrid.newAttributeLabel', { value }),
      valueFormatter: (row) => t(row.value),
      valueGetter: (params) => params.row.key || '',
      sortComparator: (a, b) => stringComparator(t(a), t(b)),
    },
    {
      field: 'value',
      headerName: t('hierarchy_filters_value'),
      flex: 1,
      editable,
      type: 'singleSelect',
      valueOptions: valueOptions.sort(fieldComparator('label')),
      filterOptions: (options, row) =>
        options.filter((option) => option.key === row.key),
      getCreateNewLabel: (value) =>
        t('hierarchyFiltersDataGrid.newAttributeValueLabel', { value }),
      valueFormatter: (row) => t(row.value),
      valueGetter: (params) => params.row.value || '',
      sortComparator: (a, b) => stringComparator(t(a), t(b)),
    },
    {
      field: 'startDate',
      ...dateColumnType,
      headerName: t('hierarchy_filters_start_date'),
      valueGetter: (params) => toDate(params.row.startDate),
      flex: 1,
      editable,
    },
    {
      field: 'endDate',
      ...dateColumnType,
      headerName: t('hierarchy_filters_end_date'),
      valueGetter: (params) => toDate(params.row.endDate),
      flex: 1,
      editable,
    },
  ];

  if (editable) {
    columns.push({
      ...actionsColumnType,
      headerName: t('dataGrid.actionsHeader'),
      getActions: (params) => {
        return [
          <GridActionsCellItem
            key="deleteRow"
            icon={<DeleteIcon />}
            onClick={() => handleDeleteRow(params.row)}
            label={t('dataGrid.deleteRow')}
            showInMenu
          />,
        ];
      },
    });
  }

  const handleAddRow = () => {
    const id = Math.floor(Math.random() * -1000000);
    setShowForm(true);
  };

  const processRowUpdate = (updatedrow) => {
    if (updatedrow) {
      onRowChange(updatedrow);
    }
    return updatedrow;
  };

  const handleDeleteRow = async (row) => {
    await onDeleteRow(row);
  };

  const handleSubmit = async (data) => {
    try {
      await onAddRow(data);
      setShowForm(false);
    } catch (error) {
      setShowForm(true);
    }
  };
  const formElement = showForm ? (
    <NewHierarchyFilterForm
      open={showForm}
      onClose={() => setShowForm(false)}
      handleSubmit={handleSubmit}
      initialRows={rows}
      selhierarchies={selectableHierarchies}
      distinctNodeAttrs={distinctNodeAttrs || {}}
      attributeKeys={attributeKeys}
    />
  ) : (
    <></>
  );

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
        loading={loading}
        processRowUpdate={processRowUpdate}
        initialState={{
          sorting: {
            sortModel: [{ field: 'hierarchy', sort: 'asc' }],
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
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            onAddRow: handleAddRow,
            authActions: authActions.hierarchyFilters,
          },
        }}
      />
      {formElement}
    </>
  );
};

HierarchyFiltersDataGrid.propTypes = {
  initialRows: PropTypes.array,
};

export default HierarchyFiltersDataGrid;
