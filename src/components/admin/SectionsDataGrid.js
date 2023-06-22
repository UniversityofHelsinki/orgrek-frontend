import React, { useMemo, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { toDate } from '../../utils/dateUtils';
import dateColumnType from './dateColumnType';
import GridToolbar from './GridToolbar';
import { authActions, isAuthorized } from '../../auth';
import useCurrentUser from '../../hooks/useCurrentUser';
import labelComparator from './labelComparator';
import actionsColumnType from './actionsColumnType';
import DeleteIcon from '@mui/icons-material/Delete';

const handleProcessRowUpdateError = () => {
  // handle error
};

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

  const handleRowUpdate = (updatedRow, originalRow) => {
    if (updatedRow.isNew) {
      onAddRow(updatedRow);
    } else {
      onRowChange(updatedRow);
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
      sortComparator: labelComparator(sectionOptions),
    },
    {
      field: 'order',
      type: 'number',
      headerName: t('sectionsDataGrid.orderColumnHeader'),
      // TODO: This field does not yet exist, see OR-1052
      valueGetter: (params) => (params.row.id > 0 ? params.row.id * 100 : ''), // id * 100 is here just for demonstration
      valueFormatter: (params) => params.value,
      width: 150,
      editable,
    },
    {
      field: 'attr',
      type: 'singleSelect',
      headerName: t('sectionsDataGrid.attributeColumnHeader'),
      flex: 1,
      editable,
      valueOptions: attributeOptions,
      sortComparator: labelComparator(attributeOptions),
    },
    {
      field: 'startDate',
      ...dateColumnType,
      headerName: t('sectionsDataGrid.startDateColumnHeader'),
      valueGetter: (params) => toDate(params.row.startDate),
      width: 200,
      editable,
    },
    {
      field: 'endDate',
      ...dateColumnType,
      headerName: t('sectionsDataGrid.endDateColumnHeader'),
      valueGetter: (params) => toDate(params.row.endDate),
      width: 200,
      editable,
    },
  ];

  if (editable) {
    columns.push({
      ...actionsColumnType,
      headerName: t('dataGrid.actionsHeader'),
      getActions: (params) => [
        <GridActionsCellItem
          key="deleteRow"
          icon={<DeleteIcon />}
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
      processRowUpdate={handleRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
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
