import React, { useEffect, useMemo } from 'react';
import {
  DataGrid,
  enUS,
  fiFI,
  GridActionsCellItem,
  svSE,
} from '@mui/x-data-grid';
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
import NewSectionDialogForm from './NewSectionDialogForm';

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
  const { t, i18n } = useTranslation();
  const user = useCurrentUser();
  const [rows, setRows] = React.useState(initialRows || []);
  const editable = isAuthorized(user, authActions.sections.edit);
  const [showForm, setShowForm] = React.useState(false);
  const language = i18n.language;

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

  const attributeOptions = attributeKeys.map((key) => ({
    value: key,
    label: t(key),
  }));

  const handleAddRow = () => {
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    try {
      await onAddRow(data);
      setShowForm(false);
    } catch (error) {
      setShowForm(true);
    }
  };

  const handleRowUpdate = async (updatedRow, originalRow) => {
    await onRowChange(updatedRow);
    return updatedRow;
  };

  const handleDeleteRow = async (row) => {
    await onDeleteRow(row);
  };

  const columns = [
    {
      field: 'section',
      type: 'singleSelect',
      headerName: t('sectionsDataGrid.sectionColumnHeader'),
      flex: 1,
      editable,
      valueOptions: sectionOptions,
      valueFormatter: (row) => t(row.value),
      sortComparator: labelComparator(sectionOptions),
    },
    {
      field: 'orderNro',
      type: 'number',
      headerName: t('sectionsDataGrid.orderColumnHeader'),
      valueFormatter: (row) => row.value,
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
      valueFormatter: (row) => t(row.value),
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

  const formElement = showForm ? (
    <NewSectionDialogForm
      open={showForm}
      onClose={() => setShowForm(false)}
      handleSubmit={handleSubmit}
      sectionOptions={sectionOptions}
      attributeOptions={attributeOptions}
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
        processRowUpdate={handleRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        initialState={{
          columns: {
            columnVisibilityModel: {
              startDate: false,
              endDate: false,
            },
          },
          sorting: {
            sortModel: [{ field: 'section', sort: 'asc' }],
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
            authActions: authActions.sections,
          },
        }}
      />
      {formElement}
    </>
  );
};

SectionsDataGrid.propTypes = {
  initialRows: PropTypes.array,
  attributeKeys: PropTypes.array,
  loading: PropTypes.bool,
};

export default SectionsDataGrid;
