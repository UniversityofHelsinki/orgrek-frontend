import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  svSE,
  fiFI,
  enUS,
} from '@mui/x-data-grid';
import GridToolbar from './GridToolbar';
import timestampColumnType from './timestampColumnType';
import PropTypes from 'prop-types';
import useCurrentUser from '../../hooks/useCurrentUser';
import { authActions, isAuthorized } from '../../auth';
import labelComparator from './labelComparator';
import actionsColumnType from './actionsColumnType';
import ReplayIcon from '../icons/Replay';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { getRowId } from '../../pages/TextsPage';

/**
 * Admin view for managing translations.
 */
const TextsDataGrid = ({
  initialRows,
  loading,
  onAddRow,
  onRowChange,
  onDeleteRows,
  saveRow,
  rows,
}) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language; // 'fi' | 'sv' | 'en'
  const user = useCurrentUser();

  const inInitialRows = (row) => {
    return (initialRows || []).some(
      (ir) => ir.key === row.key && ir.language === row.language
    );
  };

  const languageOptions = [
    { value: 'fi', label: t('fi') },
    { value: 'sv', label: t('sv') },
    { value: 'en', label: t('en') },
  ];

  const columns = [
    {
      field: 'key',
      headerName: t('texts_key'),
      flex: 1,
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
      field: 'defaultValue',
      headerName: t('textsDataGrid.defaultValueColumnHeader'),
      description: t('textsDataGrid.defaultValueColumnDescription'),
      flex: 1,
    },
    {
      field: 'translated',
      type: 'boolean',
      headerName: t('textsDataGrid.translatedColumnHeader'),
      description: t('textsDataGrid.translatedColumnDescription'),
      valueGetter: (params) => {
        const canonicalKey = params.row.key;
        const keyParts = canonicalKey.split('.');
        const lastKeyPart = keyParts[keyParts.length - 1];
        const value = params.row.value || params.row.defaultValue;

        return value !== params.row.key && value !== lastKeyPart;
      },
      width: 120,
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
    onAddRow();
  };

  const alreadyInDB = (text) => inInitialRows(text);
  const isDefaultText = (text) => !alreadyInDB(text);
  const handleRowChange = async (modified) => {
    if (isDefaultText(modified)) {
      const results = await saveRow([modified]);
      return results.at(0) || modified;
    }
    return await onRowChange(modified);
  };

  // see the keys here if you want to override data grid's inner translations:
  // https://github.com/mui/mui-x/blob/HEAD/packages/grid/x-data-grid/src/constants/localeTextConstants.ts
  const localeTextOverrides = {
    toolbarColumns: t('datagrid_toolbar_columns'),
    toolbarFilters: t('datagrid_toolbar_filters'),
    toolbarDensity: t('datagrid_toolbar_density'),
    toolbarExport: t('datagrid_toolbar_export'),
  };

  return (
    <DataGrid
      autoHeight
      initialState={{
        columns: {
          columnVisibilityModel: {
            defaultValue: false,
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
      processRowUpdate={handleRowChange}
      getRowId={getRowId}
      isCellEditable={(params) => params.field === 'value'}
      getRowClassName={(params) => !params.row.value && 'texts-default'}
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
          authActions: authActions.texts,
        },
      }}
    />
  );
};

TextsDataGrid.propTypes = {
  initialRows: PropTypes.array,
  loading: PropTypes.bool,
};

export default TextsDataGrid;
