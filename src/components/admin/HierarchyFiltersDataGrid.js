import { useTranslation } from 'react-i18next';
import React, { useMemo } from 'react';
import dateColumnType from './dateColumnType';
import { toDate } from '../../utils/dateUtils';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import GridToolbar from './GridToolbar';
import PropTypes from 'prop-types';
import autocompleteColumnType from './autocompleteColumnType';

const HierarchyFiltersDataGrid = ({ initialRows }) => {
  const { t } = useTranslation();
  const [rows, setRows] = React.useState(initialRows);

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
      editable: true,
      valueOptions: hierarchyOptions,
      getCreateNewLabel: (value) =>
        t('hierarchyFiltersDataGrid.newHierarchyLabel', { value }),
      valueFormatter: (params) => t(params.value),
    },
    {
      field: 'key',
      ...autocompleteColumnType,
      headerName: t('hierarchy_filters_key'),
      flex: 1,
      editable: true,
      valueOptions: keyOptions,
      getCreateNewLabel: (value) =>
        t('hierarchyFiltersDataGrid.newAttributeLabel', { value }),
      valueFormatter: (params) => t(params.value),
    },
    {
      field: 'value',
      ...autocompleteColumnType,
      headerName: t('hierarchy_filters_value'),
      flex: 1,
      editable: true,
      valueOptions: valueOptions,
      filterOptions: (options, row) =>
        options.filter((option) => option.key === row.key),
      getCreateNewLabel: (value) =>
        t('hierarchyFiltersDataGrid.newAttributeValueLabel', { value }),
      valueFormatter: (params) => t(params.value),
    },
    {
      field: 'startDate',
      ...dateColumnType,
      headerName: t('hierarchy_filters_start_date'),
      valueGetter: (params) => toDate(params.row.startDate),
      flex: 1,
      editable: true,
    },
    {
      field: 'endDate',
      ...dateColumnType,
      headerName: t('hierarchy_filters_end_date'),
      valueGetter: (params) => toDate(params.row.endDate),
      flex: 1,
      editable: true,
    },
    {
      field: t('dataGrid.actionsHeader'),
      type: 'actions',
      hideable: false,
      getActions: () => [
        <GridActionsCellItem
          key="deleteRow"
          icon={null}
          onClick={() => {}}
          label={t('dataGrid.deleteRow')}
          showInMenu
        />,
      ],
    },
  ];

  const handleAdd = () => {
    const id = Math.floor(Math.random() * -1000000);
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        hierarchy: null,
        key: null,
        value: null,
        startDate: null,
        endDate: null,
        isNew: true,
      },
    ]);
  };

  return (
    <DataGrid
      autoHeight
      columns={columns}
      rows={rows}
      slots={{
        toolbar: GridToolbar,
      }}
      slotProps={{
        toolbar: {
          onAddRow: handleAdd,
        },
      }}
    />
  );
};

HierarchyFiltersDataGrid.propTypes = {
  initialRows: PropTypes.array.isRequired,
};

export default HierarchyFiltersDataGrid;
