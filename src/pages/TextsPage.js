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
    if (!alreadyExists) {
      await handleAddRow([{ ...row, user_name: user.eppn }]);
      return;
    }
    await updateText(row).unwrap();
  };

  const handleAddRow = async (rows) => {
    const response = await insertTexts(rows).unwrap();
    dispatch(
      showNotification({
        message: t('texts_insert_success'),
        severity: 'success',
      })
    );
    setOpenNewTextForm(false);
    return response;
  };

  const handleDeleteRows = (rows) => {
    rows.forEach(async (row) => {
      await deleteText(row).unwrap();
    });
  };

  const newTextForm = openNewTextForm ? (
    <NewTextForm
      onSubmit={handleAddRow}
      open={openNewTextForm}
      onClose={() => setOpenNewTextForm(false)}
      existingTexts={texts}
    />
  ) : (
    <></>
  );

  return (
    <Container sx={{ pt: 6, pb: 6 }}>
      <TextsDataGrid
        initialRows={texts}
        loading={loading}
        onRowChange={handleRowChange}
        onAddRow={() => setOpenNewTextForm(true)}
        onDeleteRows={handleDeleteRows}
      />
      {newTextForm}
    </Container>
  );
};

export default TextsPage;
