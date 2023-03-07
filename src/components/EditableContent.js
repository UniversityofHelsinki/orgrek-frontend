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

/**
 * Submit and cancel buttons are defined in this subcomponent because useForm
 * hook can be used only inside FormContextProvider.
 */
const FormActions = () => {
  const { t } = useTranslation();
  const { close, setModified } = useEditMode();
  const { dirty } = useForm();

  // Update modified state for EditableAccordion when form values become modified
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

/**
 * Displays content that can be edited with the given editor component.
 *
 * This component should be used inside edit mode context. The context
 * holds information whether to display the actual content or the editor
 * component.
 *
 * This component provides a form content, so that useForm hook can be used
 * in the editor component to read and update form values.
 *
 * In view mode, edit button is displayed above the content.
 * In edit mode, save and cancel buttons are displayed below the editor.
 */
const EditableContent = ({
  editorComponent,
  renderActions,
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
  }

  const defaultActions = (
    <IfAdmin>
      <ActionBar>
        <Button variant="outlined" onClick={edit}>
          {t('edit_mode_edit_button')}
        </Button>
      </ActionBar>
    </IfAdmin>
  );

  const renderedActions = renderActions
    ? renderActions({ edit })
    : defaultActions;

  return (
    <Stack spacing={2}>
      {renderedActions}
      <div>{children}</div>
    </Stack>
  );
};

export default EditableContent;
