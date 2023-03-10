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
import PropTypes from 'prop-types';

/**
 * Submit and cancel buttons are defined in this subcomponent because useForm
 * hook can be used only inside FormContextProvider.
 */
const FormActions = () => {
  const { t } = useTranslation();
  const { close, setModified } = useEditMode();
  const { dirty, valid } = useForm();

  // Update modified state for EditableAccordion when form values become modified
  useEffect(() => {
    setModified(dirty);
  }, [dirty]);

  const canSubmit = dirty && valid;

  return (
    <ActionBar>
      <Button variant="outlined" onClick={close}>
        {t('cancel_button')}
      </Button>
      <Button variant="contained" type="submit" loading disabled={!canSubmit}>
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

EditableContent.propTypes = {
  /** Content displayed in edit mode */
  editorComponent: PropTypes.element.isRequired,

  /** Initial form values passed to form context */
  initialValues: PropTypes.object.isRequired,

  /**
   * Called when the form is submitted. Takes form values as the first arg.
   * Must return a Promise. Closes edit mode when the promise is resolved.
   * Remains in edit mode if the promise is rejected.
   */
  onSubmit: PropTypes.func.isRequired,

  /**
   * Optional callback for validating form values.
   * Gets called every time when the form values change.
   * Takes form values as the first arg. Returns a map of error messages.
   */
  validate: PropTypes.func,

  /**
   * Pass a function to customize action buttons displayed above content.
   * Takes a map of default action handlers (i.e. edit) as the first arg.
   * Use them to render the default actions.
   */
  renderActions: PropTypes.func,
};

export default EditableContent;
