import React, { useEffect } from 'react';
import useEditMode from '../hooks/useEditMode';
import Form from './Form';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ActionBar from './nodeDetails/ActionBar';
import { useTranslation } from 'react-i18next';
import useForm from '../hooks/useForm';
import { FormContextProvider } from '../contexts/FormContext';
import IfAdmin from './auth/IfAdmin';

const FormActions = () => {
  const { t } = useTranslation();
  const { close, setModified } = useEditMode();
  const { dirty } = useForm();

  useEffect(() => {
    setModified(dirty);
  }, [dirty]);

  return (
    <ActionBar>
      <Button variant="outlined" onClick={close}>
        {t('cancel_button')}
      </Button>
      <Button variant="contained" type="submit">
        {t('edit_mode_save_button')}
      </Button>
    </ActionBar>
  );
};

const EditableContent = ({
  renderActions,
  editorComponent,
  initialValues,
  validate,
  onSubmit,
  children,
}) => {
  const { t } = useTranslation();
  const { editMode, edit, close } = useEditMode();

  const handleSubmit = (values) => {
    onSubmit(values).then(() => close());
  };

  const actions = { edit };

  const defaultRenderActions = () => (
    <IfAdmin>
      <ActionBar>
        <Button variant="outlined" onClick={edit}>
          {t('edit_mode_edit_button')}
        </Button>
      </ActionBar>
    </IfAdmin>
  );

  if (editMode) {
    return (
      <FormContextProvider
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form>
          <Stack spacing={2}>
            {editorComponent}
            <FormActions />
          </Stack>
        </Form>
      </FormContextProvider>
    );
  } else {
    const renderedActions = renderActions
      ? renderActions(actions)
      : defaultRenderActions();

    return (
      <Stack spacing={2}>
        {renderedActions}
        <div>{children}</div>
      </Stack>
    );
  }
};

export default EditableContent;
