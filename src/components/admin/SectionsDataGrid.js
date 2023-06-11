import React, { useMemo } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { toDate } from '../../utils/dateUtils';
import dateColumnType from './dateColumnType';
import GridToolbar from './GridToolbar';

const SectionsDataGrid = ({ initialRows, attributeKeys }) => {
  const { t } = useTranslation();
  const [rows, setRows] = React.useState(initialRows);

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

  const columns = [
    {
      field: 'section',
      type: 'singleSelect',
      headerName: t('sectionsDataGrid.sectionColumnHeader'),
      flex: 1,
      editable: true,
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
      editable: true,
    },
    {
      field: 'attr',
      type: 'singleSelect',
      headerName: t('sectionsDataGrid.attributeColumnHeader'),
      flex: 1,
      editable: true,
      valueOptions: attributeOptions,
    },
    {
      field: 'startDate',
      ...dateColumnType,
      headerName: t('sectionsDataGrid.startDateColumnHeader'),
      valueGetter: (params) => toDate(params.row.startDate),
      flex: 1,
      editable: true,
    },
    {
      field: t('dataGrid.actionsHeader'),
      type: 'actions',
      hideable: false,
      getActions: () => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
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
        section: null,
        attr: null,
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
      initialState={{
        columns: {
          columnVisibilityModel: {
            startDate: false,
            order: false, // TODO: Hidden for now because this field does not yet exist, see OR-1052
          },
        },
      }}
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

SectionsDataGrid.propTypes = {
  initialRows: PropTypes.array.isRequired,
};

export default SectionsDataGrid;
