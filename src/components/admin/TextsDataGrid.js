import { useTranslation } from 'react-i18next';
import React, { useEffect, useMemo } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import GridToolbar from './GridToolbar';
import timestampColumnType from './timestampColumnType';
import PropTypes from 'prop-types';
import useCurrentUser from '../../hooks/useCurrentUser';
import { authActions, isAuthorized } from '../../auth';
import labelComparator from './labelComparator';
import actionsColumnType from './actionsColumnType';
import ReplayIcon from '../icons/Replay';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const getRowId = (row) => `${row.language}.${row.key}`;

/**
 * Converts i18next resources to the db format
 */
export const textsToRows = (data, language, parentKey) =>
  Object.entries(data)
    .map(([key, value]) => {
      const canonicalKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === 'object') {
        return textsToRows(value, language, canonicalKey);
      } else {
        return [
          {
            key: canonicalKey,
            language,
            value: null,
            defaultValue: value,
            user_name: null,
            timestamp: null,
          },
        ];
      }
    })
    .flat();

export const mergeTexts = (first, second) => {
  const result = {};

  first.forEach((row) => (result[getRowId(row)] = row));

  second.forEach((row) => {
    const current = result[getRowId(row)];
    result[getRowId(row)] = {
      key: row.key,
      language: row.language,
      value: row.value || current.value,
      defaultValue: row.defaultValue || current.defaultValue,
      user_name: row.user_name || current.user_name,
      timestamp: row.timestamp || current.timestamp,
    };
  });

  return Object.values(result);
};

/**
 * Admin view for managing translations.
 */
const TextsDataGrid = ({
  initialRows,
  loading,
  onAddRow,
  onRowChange,
  onDeleteRows,
}) => {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const [rows, setRows] = React.useState(initialRows || []);

  useEffect(() => {
    if (!loading) {
      setRows(initialRows);
    }
  }, [loading]);

  // TODO: Needed for add row dialog
  const keyOptions = useMemo(
    () =>
      rows
        .filter(
          (row, index, rows) =>
            index === rows.findIndex((r) => r.key === row.key)
        )
        .map((row) => ({
          value: row.key,
          label: row.key,
        })),
    [rows]
  );

  const languageOptions = [
    { value: 'fi', label: t('fi') },
    { value: 'sv', label: t('sv') },
    { value: 'en', label: t('en') },
  ];

  const columns = [
    {
      field: 'key',
      headerName: t('texts_key'),
      width: 250,
    },
    {
      field: 'language',
      headerName: t('texts_language'),
      type: 'singleSelect',
      valueOptions: languageOptions,
      sortComparator: labelComparator(languageOptions),
      width: 50,
    },
    {
      field: 'value',
      headerName: t('texts_value'),
      flex: 1,
      editable: isAuthorized(user, authActions.texts.edit),
      valueGetter: (params) => params.row.value || params.row.defaultValue,
    },
    {
      field: 'default',
      type: 'boolean',
      headerName: t('textsDataGrid.defaultColumnHeader'),
      valueGetter: (params) => !params.row.value,
      width: 100,
    },
    {
      field: 'translated',
      type: 'boolean',
      headerName: t('textsDataGrid.translatedColumnHeader'),
      valueGetter: (params) =>
        (params.row.value || params.row.defaultValue) !== params.row.key,
      width: 100,
    },
    {
      field: 'user_name',
      headerName: t('texts_editor'),
      width: 150,
    },
    {
      field: 'timestamp',
      ...timestampColumnType,
      headerName: t('texts_timestamp'),
      width: 200,
    },
  ];

  if (isAuthorized(user, authActions.texts.edit)) {
    columns.push({
      ...actionsColumnType,
      headerName: t('dataGrid.actionsHeader'),
      getActions: (params) => {
        const canDelete = params.row.value && !params.row.defaultValue;
        const canReset = params.row.value && params.row.defaultValue;

        const actions = [];

        const handleDeleteRow = () => {
          const rowsToDelete = [params.row];
          onDeleteRows(rowsToDelete);
        };

        const handleDeleteAllLanguages = () => {
          const rowsToDelete = rows.filter((r) => r.key === params.row.key);
          onDeleteRows(rowsToDelete);
        };

        if (canReset) {
          actions.push(
            <GridActionsCellItem
              key="resetRow"
              disabled={!canReset}
              icon={<ReplayIcon />}
              onClick={handleDeleteRow}
              label={t('textsDataGrid.resetToDefault')}
              showInMenu
            />,
            <GridActionsCellItem
              key="resetAllLanguages"
              icon={<ClearAllIcon />}
              onClick={handleDeleteAllLanguages}
              label={t('textsDataGrid.resetAllLanguages')}
              showInMenu
            />
          );
        }

        if (canDelete) {
          actions.push(
            <GridActionsCellItem
              key="deleteRow"
              disabled={!canDelete}
              icon={<DeleteIcon />}
              onClick={handleDeleteRow}
              label={t('dataGrid.deleteRow')}
              showInMenu
            />,
            <GridActionsCellItem
              key="deleteAllLanguages"
              icon={<DeleteSweepIcon />}
              onClick={handleDeleteAllLanguages}
              label={t('textsDataGrid.deleteAllLanguages')}
              showInMenu
            />
          );
        }

        return actions;
      },
    });
  }

  const handleAddRow = () => {
    // TODO: Open dialog and call onAddRow when dialog is submitted
    const newRow = {
      key: null,
      language: null,
      value: null,
      user_name: null,
      timestamp: null,
      isNew: true,
    };

    setRows((oldRows) => [...oldRows, newRow]);
    onAddRow(newRow);
  };

  const handleCellEditStop = (params) => {
    onRowChange(params.row);
  };

  return (
    <DataGrid
      autoHeight
      initialState={{
        columns: {
          columnVisibilityModel: {
            default: false,
            translated: false,
          },
        },
        sorting: {
          sortModel: [{ field: 'key', sort: 'asc' }],
        },
      }}
      columns={columns}
      rows={rows}
      loading={loading}
      onCellEditStop={handleCellEditStop}
      getRowId={getRowId}
      getRowClassName={(params) => !params.row.value && 'texts-default'}
      slots={{
        toolbar: GridToolbar,
      }}
      slotProps={{
        toolbar: {
          onAddRow: handleAddRow,
          authActions: authActions.texts,
        },
      }}
      sx={{
        '.texts-default': {
          backgroundColor: 'grey.50',
        },
      }}
    />
  );
};

TextsDataGrid.propTypes = {
  /** Rows passed to DataGrid */
  initialRows: PropTypes.array.isRequired,

  /** Called when one or more rows are deleted. Takes an array of rows as argument. */
  onDeleteRows: PropTypes.func.isRequired,
};

export default TextsDataGrid;
