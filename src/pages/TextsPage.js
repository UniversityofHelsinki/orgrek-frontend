import React, { useMemo, useState } from 'react';
import Container from '@mui/material/Container';
import {
  showNotification,
  useDeleteTextMutation,
  useGetTextsQuery,
  useInsertTextsMutation,
  useUpdateTextMutation,
} from '../store';
import TextsDataGrid from '../components/admin/TextsDataGrid';
import NewTextForm from '../components/admin/NewTextForm';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useCurrentUser from '../hooks/useCurrentUser';
import defaultFi from '../locales/default.fi.json';
import defaultSv from '../locales/default.sv.json';
import defaultEn from '../locales/default.en.json';

export const getRowId = (row) => `${row.language}.${row.key}`;
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
  ia: [],
};

const TextsPage = () => {
  const { data: texts, isFetching } = useGetTextsQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useCurrentUser();
  const [insertTexts] = useInsertTextsMutation();
  const [updateText] = useUpdateTextMutation();
  const [deleteText] = useDeleteTextMutation();

  const [openNewTextForm, setOpenNewTextForm] = useState(false);

  const loading = isFetching;

  const handleRowChange = async (row) => {
    const alreadyExists = texts.some(
      (t) => t.key === row.key && t.language === row.language
    );
    const completeText = { ...row, user_name: user.eppn };
    if (!alreadyExists) {
      await handleAddRow([completeText]);
      return;
    }
    const response = await updateText(completeText).unwrap();
    dispatch(
      showNotification({
        message: t('texts_update_success'),
        severity: 'success',
      })
    );
    return response;
  };

  const saveRow = async (rows) => {
    const withUser = (t) => ({ ...t, user_name: user.eppn });
    const response = await insertTexts(rows.map(withUser)).unwrap();
    dispatch(
      showNotification({
        message: t('texts_insert_success'),
        severity: 'success',
      })
    );
    return response;
  };

  const handleAddRow = async (rows) => {
    const response = await saveRow(rows);
    setOpenNewTextForm(false);
    return response;
  };

  const handleDeleteRows = (rows) => {
    rows.forEach(async (row) => {
      await deleteText(row).unwrap();
    });
  };

  const defaultRows = Object.values(defaults).flat();
  const rows = mergeTexts(texts || [], defaultRows);
  const newTextForm = openNewTextForm ? (
    <NewTextForm
      onSubmit={handleAddRow}
      open={openNewTextForm}
      onClose={() => setOpenNewTextForm(false)}
      existingTexts={rows}
    />
  ) : (
    <></>
  );

  return (
    <Container sx={{ pt: 6, pb: 6 }} id="main-content" tabIndex="-1">
      <TextsDataGrid
        initialRows={texts}
        loading={loading}
        onRowChange={handleRowChange}
        onAddRow={() => setOpenNewTextForm(true)}
        saveRow={saveRow}
        onDeleteRows={handleDeleteRows}
        defaults={defaults}
        rows={rows}
      />
      {newTextForm}
    </Container>
  );
};

export default TextsPage;
