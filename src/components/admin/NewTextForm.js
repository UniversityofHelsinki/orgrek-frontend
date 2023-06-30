import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import Button from '../inputs/Button';
import useForm from '../../hooks/useForm';
import { Form } from '../../contexts/FormContext';
import useCurrentUser from '../../hooks/useCurrentUser';
import ValueField from '../attributes/ValueField';
import { newTextSchema } from '../../utils/validations';

const Actions = ({ onCancel }) => {
  const { t } = useTranslation();
  const { dirty, invalid, submitting } = useForm();
  const actions = (
    <>
      <Button variant="outlined" onClick={onCancel} disabled={submitting}>
        {t('cancel_button')}
      </Button>
      <Button
        type="submit"
        variant="contained"
        disabled={!dirty || invalid}
        loading={submitting}
      >
        {t('save_button')}
      </Button>
    </>
  );
  return actions;
};

const KeyField = () => {
  const { values } = useForm();
  const { t } = useTranslation();

  return (
    <ValueField name="key" label={t(`texts_key`)} path="" value={values.key} />
  );
};

const LanguageField = ({ language }) => {
  const { values } = useForm();
  const { t } = useTranslation();

  return (
    <ValueField
      name={language}
      label={t(`texts_${language}`)}
      path=""
      value={values[language]}
    />
  );
};

const NewTextForm = ({ open, onClose, onSubmit, existingTexts }) => {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const validationSchema = newTextSchema(
    existingTexts,
    t('texts_key_already_exists')
  );

  const now = new Date();
  const formObject = {
    key: null,
    fi: null,
    sv: null,
    en: null,
    timestamp: now,
    user_name: user.eppn,
    isNew: true,
  };

  const headerRow = (
    <Stack alignItems="center" justifyContent="space-between" direction="row">
      <Typography component="p" variant="h4">
        {t('texts_new')}
      </Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );

  const handleSubmit = (text) => {
    const texts = ['fi', 'en', 'sv'].map((lang) => ({
      key: text.key,
      value: text[lang],
      language: lang,
      timestamp: now,
      user_name: user.eppn,
    }));
    return onSubmit(texts);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
      <Form
        onSubmit={handleSubmit}
        initialValues={formObject}
        validationSchema={validationSchema}
      >
        <DialogTitle>{headerRow}</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={1}>
            <KeyField />
            <LanguageField language="fi" />
            <LanguageField language="en" />
            <LanguageField language="sv" />
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Actions onCancel={onClose} />
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default NewTextForm;
