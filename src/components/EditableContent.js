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
import Typography from '@mui/material/Typography';

/**
 * Renders form validation error message.
 *
 * Errors are rendered in this subcomponent because useForm hook cannot be used
 * directly in EditableContent, as it must be called inside FormContextProvider.
 */
const ValidationResult = () => {
  const { errors } = useForm();

  if (!errors.error) {
    return null;
  }

  // Display form validation error returned from validate function
  // errors.error is now just a single message for the whole form, but it can
  // be changed into something else if needed.
  //
  // Expects errors.error to be already translated. The message may contain
  // also variables, therefore the validator function should take care of the
  // translation.
  return (
    <Typography align="right" color="error.main">
      {errors.error}
    </Typography>
  );
};

/**
 * Renders submit and cancel buttons.
 *
 * Buttons are rendered in this subcomponent because useForm hook cannot be used
 * directly in EditableContent, as it must be called inside FormContextProvider.
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
        {t('edit_mode_save_button')}RR
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
            <ValidationResult />
            <FormActions />
          </Stack>
        </Form>
      </FormContextProvider>
    );
  }

  // Default actions contains edit button above the view mode content
  const defaultActions = (
    <IfAdmin>
      <ActionBar>
        <Button variant="outlined" onClick={edit} data-testid="editButton">
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
