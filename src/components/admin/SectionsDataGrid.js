import React, { useMemo, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { toDate } from '../../utils/dateUtils';
import dateColumnType from './dateColumnType';
import GridToolbar from './GridToolbar';
import { authActions, isAuthorized } from '../../auth';
import useCurrentUser from '../../hooks/useCurrentUser';

const SectionsDataGrid = ({
  initialRows,
  attributeKeys,
  loading,
  onAddRow,
  onRowChange,
  onDeleteRow,
}) => {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const [rows, setRows] = React.useState(initialRows || []);
  const editable = isAuthorized(user, authActions.sections.edit);

  useEffect(() => {
    if (!loading) {
      setRows(initialRows);
    }
  }, [loading]);

  const sectionOptions = [
    { value: 'names', label: t('name_info') },
    { value: 'types', label: t('type') },
    { value: 'codes', label: t('codes') },
    {
      value: 'other_attributes',
      label: t('other_attributes'),
    },
  ];

  const attributeOptions = useMemo(
    () =>
      attributeKeys.map((key) => ({
        value: key,
        label: t(key),
      })),
    [attributeKeys]
  );

  const handleAddRow = () => {
    const id = Math.floor(Math.random() * -1000000);
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        section: null,
        attr: null,
        startDate: null,
        endDate: null,
        isNew: true,
      },
    ]);
  };

  const handleCellEditStop = (params) => {
    if (params.row.isNew) {
      onAddRow(params.row);
    } else {
      onRowChange(params.row);
    }
  };

  const handleDeleteRow = (row) => {
    onDeleteRow(row);
  };

  const columns = [
    {
      field: 'section',
      type: 'singleSelect',
      headerName: t('sectionsDataGrid.sectionColumnHeader'),
      flex: 1,
      editable,
      valueOptions: sectionOptions,
    },
    {
      field: 'order',
      type: 'number',
      headerName: t('sectionsDataGrid.orderColumnHeader'),
      // TODO: This field does not yet exist, see OR-1052
      valueGetter: (params) => (params.row.id > 0 ? params.row.id * 100 : ''), // id * 100 is here just for demonstration
      valueFormatter: (params) => params.value,
      width: 100,
      editable,
    },
    {
      field: 'attr',
      type: 'singleSelect',
      headerName: t('sectionsDataGrid.attributeColumnHeader'),
      flex: 1,
      editable,
      valueOptions: attributeOptions,
    },
    {
      field: 'startDate',
      ...dateColumnType,
      headerName: t('sectionsDataGrid.startDateColumnHeader'),
      valueGetter: (params) => toDate(params.row.startDate),
      flex: 1,
      editable,
    },
    {
      field: 'endDate',
      ...dateColumnType,
      headerName: t('sectionsDataGrid.endDateColumnHeader'),
      valueGetter: (params) => toDate(params.row.endDate),
      flex: 1,
      editable,
    },
  ];

  if (editable) {
    columns.push({
      field: t('dataGrid.actionsHeader'),
      type: 'actions',
      hideable: false,
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          icon={null}
          onClick={() => handleDeleteRow(params.row)}
          label={t('dataGrid.deleteRow')}
          showInMenu
        />,
      ],
    });
  }

  return (
    <DataGrid
      autoHeight
      columns={columns}
      rows={rows}
      loading={loading}
      onCellEditStop={handleCellEditStop}
      initialState={{
        columns: {
          columnVisibilityModel: {
            startDate: false,
            endDate: false,
            order: false, // TODO: Hidden for now because this field does not yet exist, see OR-1052
          },
        },
        sorting: {
          sortModel: [{ field: 'section', sort: 'asc' }],
        },
      }}
      slots={{
        toolbar: GridToolbar,
      }}
      slotProps={{
        toolbar: {
          onAddRow: handleAddRow,
          authActions: authActions.sections,
        },
      }}
    />
  );
};

SectionsDataGrid.propTypes = {
  initialRows: PropTypes.array,
  attributeKeys: PropTypes.array,
  loading: PropTypes.bool,
};

export default SectionsDataGrid;
