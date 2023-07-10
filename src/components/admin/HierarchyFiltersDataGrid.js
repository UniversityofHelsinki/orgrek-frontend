import { useTranslation } from 'react-i18next';
import React, { useEffect, useMemo, useState } from 'react';
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
import autocompleteColumnType from './autocompleteColumnType';
import { authActions, isAuthorized } from '../../auth';
import useCurrentUser from '../../hooks/useCurrentUser';
import actionsColumnType from './actionsColumnType';
import DeleteIcon from '@mui/icons-material/Delete';
import NewHierarchyFilterForm from '../nodeDetails/NewHierarchyFilterForm';

const HierarchyFiltersDataGrid = ({
  initialRows,
  selectableHierarchies,
  edgeHierarchies,
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

  const hierarchyOptions = useMemo(
    () =>
      rows
        .filter(
          (row, index, rows) =>
            index === rows.findIndex((r) => r.hierarchy === row.hierarchy)
        )
        .map((row) => ({
          value: row.hierarchy,
          label: t(row.hierarchy),
        })),
    [rows]
  );

  const keyOptions = useMemo(
    () =>
      rows
        .filter(
          (row, index, rows) =>
            index === rows.findIndex((r) => r.key === row.key)
        )
        .map((row) => ({
          value: row.key,
          label: t(row.key),
        })),
    [rows]
  );

  const valueOptions = useMemo(
    () =>
      rows
        .filter(
          (row, index, rows) =>
            index === rows.findIndex((r) => r.value === row.value)
        )
        .map((row) => ({
          value: row.value,
          label: t(row.value),
          key: row.key,
        })),
    [rows]
  );

  const columns = [
    {
      field: 'hierarchy',
      ...autocompleteColumnType,
      headerName: t('hierarchy_filters_hierarchy'),
      flex: 1,
      editable,
      valueOptions: hierarchyOptions,
      getCreateNewLabel: (value) =>
        t('hierarchyFiltersDataGrid.newHierarchyLabel', { value }),
      valueFormatter: (row) => t(row.value),
    },
    {
      field: 'key',
      ...autocompleteColumnType,
      headerName: t('hierarchy_filters_key'),
      flex: 1,
      editable,
      valueOptions: keyOptions,
      getCreateNewLabel: (value) =>
        t('hierarchyFiltersDataGrid.newAttributeLabel', { value }),
      valueFormatter: (row) => t(row.value),
    },
    {
      field: 'value',
      ...autocompleteColumnType,
      headerName: t('hierarchy_filters_value'),
      flex: 1,
      editable,
      valueOptions: valueOptions,
      filterOptions: (options, row) =>
        options.filter((option) => option.key === row.key),
      getCreateNewLabel: (value) =>
        t('hierarchyFiltersDataGrid.newAttributeValueLabel', { value }),
      valueFormatter: (row) => t(row.value),
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
  const initialValues = {
    hierarchy: null,
    isNew: true,
  };

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
      edgeHierarchies={edgeHierarchies}
      attributeKeys={attributeKeys}
    />
  ) : (
    <></>
  );

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
          language === 'fi'
            ? fiFI.components.MuiDataGrid.defaultProps.localeText
            : language === 'sv'
            ? svSE.components.MuiDataGrid.defaultProps.localeText
            : enUS.components.MuiDataGrid.defaultProps.localeText
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
