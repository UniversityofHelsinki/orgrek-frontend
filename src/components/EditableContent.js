import React, { useEffect } from 'react';
import useEditMode from '../hooks/useEditMode';
import Stack from '@mui/material/Stack';
import Button from './inputs/Button';
import ActionBar from './nodeDetails/ActionBar';
import { useTranslation } from 'react-i18next';
import useForm from '../hooks/useForm';
import { Form } from '../contexts/FormContext';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { showNotification } from '../store';
import { useDispatch } from 'react-redux';
import IfAuthorized from '../auth/IfAuthorized';
import HelperText from './inputs/HelperText';

/**
 * Renders form validation error message.
 *
 * Errors are rendered in this subcomponent because useForm hook cannot be used
 * directly in EditableContent, as it must be called inside form context.
 */
const ValidationResult = () => {
  const { errors } = useForm();

  if (!errors.error) {
    return null;
  }

  if (Array.isArray(errors.error) && errors.error.length === 0) {
    return null;
  }

  // Display form validation errors returned from validate function
  // errors.error can be either a single string or an array of strings.
  //
  // Expects errors.error to be already translated. The message may contain
  // also variables, therefore the validator function should take care of the
  // translation.
  return (
    <Typography align="right" color="error.main">
      <HelperText errors={errors.error} />
    </Typography>
  );
};

/**
 * Renders submit and cancel buttons.
 *
 * Buttons are rendered in this subcomponent because useForm hook cannot be used
 * directly in EditableContent, as it must be called inside form context.
 */
const FormActions = () => {
  const { t } = useTranslation();
  const { close, setModified } = useEditMode();
  const { dirty, valid, submitting, removeBeforeUnloadListener } = useForm();

  // Update modified state for EditableAccordion when form values become modified
  useEffect(() => {
    setModified(dirty);
  }, [dirty]);

  const handleCancel = () => {
    removeBeforeUnloadListener();
    close();
  };

  const canSubmit = dirty && valid;

  return (
    <ActionBar>
      <Button
        variant="outlined"
        onClick={handleCancel}
        disabled={submitting}
        role="button"
      >
        {t('cancel_button')}
      </Button>
      <Button
        variant="contained"
        type="submit"
        loading={submitting}
        disabled={!canSubmit}
      >
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
  validationSchema,
  validate,
  onSubmit,
  children,
  authActions,
  successMessage = null,
  errorMessage = null,
  containerProps,
}) => {
  const { t } = useTranslation();
  const { editMode, edit, close } = useEditMode();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    return onSubmit(values)
      .then(() => {
        dispatch(
          showNotification({
            message: successMessage || t('update_attributes_success'),
            severity: 'success',
          })
        );

        close();
      })
      .catch((error) => {
        // Middleware shows a generic notification for every error,
        // this notification overrides it with a more specific message.
        dispatch(
          showNotification({
            message:
              (error.data && error.data[0] && t(error.data[0].errorMessage)) ||
              errorMessage ||
              t('update_attributes_error'),
            severity: 'error',
          })
        );
      });
  };

  if (editMode) {
    return (
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Stack spacing={2}>
          {editorComponent}
          <ValidationResult />
          <FormActions />
        </Stack>
      </Form>
    );
  }

  // Default actions contains edit button above the view mode content
  const defaultActions = (
    <IfAuthorized action={authActions.edit}>
      <ActionBar>
        <Button variant="outlined" onClick={edit} data-testid="editButton">
          {t('edit_mode_edit_button')}
        </Button>
      </ActionBar>
    </IfAuthorized>
  );

  const renderedActions = renderActions
    ? renderActions({ edit })
    : defaultActions;

  return (
    <Stack spacing={2} {...containerProps}>
      {renderedActions}
      {children}
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
   * Yup validation schema.
   *
   * Validates form values when the values change.
   * Supports also async validation.
   * This is the preferred method for doing the validation (see also validate
   * prop).
   */
  validationSchema: PropTypes.object,

  /**
   * Optional callback for validating form values.
   *
   * Gets called every time when the form values change.
   * Takes form values as the first arg. Returns a map of error messages.
   * Async functions are also supported.
   *
   * Validation schema is the preferred method to do the validation. However,
   * this alternative method may serve better for some more complex validation
   * rules concerning the whole form.
   *
   * Use key 'error' to display errors at the bottom of the form or a field path
   * to display it below a specific field.
   */
  validate: PropTypes.func,

  /**
   * Pass a function to customize action buttons displayed above content.
   * Takes a map of default action handlers (i.e. edit) as the first arg.
   * Use them to render the default actions.
   */
  renderActions: PropTypes.func,

  /**
   * Defines which actions are used for checking authorization. Pass the
   * appropriate object from auth.js.
   */
  authActions: PropTypes.shape({
    edit: PropTypes.object.isRequired,
  }).isRequired,

  /**
   * Custom notification message displayed after content has been saved
   */
  successMessage: PropTypes.string,

  /**
   * Custom notification message displayed when saving content fails
   */
  errorMessage: PropTypes.string,

  /**
   * Override Stack props to customize actions layout
   */
  containerProps: PropTypes.object,
};

export default EditableContent;
