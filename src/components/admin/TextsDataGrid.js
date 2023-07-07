import { useTranslation } from 'react-i18next';
import React, { useEffect, useMemo } from 'react';
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
import defaultFi from '../../locales/default.fi.json';
import defaultSv from '../../locales/default.sv.json';
import defaultEn from '../../locales/default.en.json';

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
    const current = result[getRowId(row)] || row;
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

const defaults = {
  fi: textsToRows(defaultFi, 'fi'),
  en: textsToRows(defaultEn, 'en'),
  sv: textsToRows(defaultSv, 'sv'),
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
  const { t, i18n } = useTranslation();
  const language = i18n.language; // 'fi' | 'sv' | 'en'
  const defaultRows = defaults[language];
  const user = useCurrentUser();
  const [rows, setRows] = React.useState(
    mergeTexts(initialRows || [], defaultRows)
  );

  useEffect(() => {
    if (!loading) {
      setRows(mergeTexts(initialRows, defaultRows));
    }
  }, [loading]);

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

  const handleRowChange = (modified) => {
    onRowChange(modified);
    return Promise.resolve(modified);
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
      isCellEditable={(params) =>
        params.field === 'value' && inInitialRows(params.row)
      }
      getRowClassName={(params) => !params.row.value && 'texts-default'}
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
