import React, { useState } from 'react';
import { createContext } from 'react';
import PropTypes from 'prop-types';
import { validateAndMergeResults } from '../utils/validationUtils';
import { withValue } from '../utils/withValue';
import { get } from 'lodash';

const FormContext = createContext();

const beforeUnloadConfirmation = (event) => {
  event.preventDefault();
};

export const Form = ({
  initialValues = {},
  onChange,
  onSubmit,
  validationSchema,
  validate,
  children,
}) => {
  const [values, setValuesState] = useState(initialValues);
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const addBeforeUnloadListener = () => {
    window.addEventListener('beforeunload', beforeUnloadConfirmation);
  };

  const removeBeforeUnloadListener = () => {
    window.removeEventListener('beforeunload', beforeUnloadConfirmation);
  };

  const setValues = (newValues) => {
    if (!dirty) {
      addBeforeUnloadListener();
    }

    setDirty(true);
    setValuesState(newValues);
    onChange && onChange(newValues);

    const options = {
      abortEarly: false,
    };

    validateAndMergeResults(
      newValues,
      validate,
      validationSchema,
      options
    ).then((result) => setErrors(result));
  };

  const getValue = (path) => {
    return get(values, path);
  };

  const setValue = (path, newValue) => {
    setValues(withValue(values, path, newValue));
  };

  const submit = async () => {
    removeBeforeUnloadListener();
    if (!onSubmit) {
      return;
    }

    setSubmitting(true);
    const submitValues = validationSchema
      ? validationSchema.cast(values)
      : values;

    try {
      await onSubmit(submitValues);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    removeBeforeUnloadListener();
    setValues(initialValues);
    setDirty(false);
  };

  // Form is invalid when errors contain at least one value
  const invalid = Object.values(errors).some((error) =>
    Array.isArray(error) ? error.length > 0 : Boolean(error)
  );
  const valid = !invalid;

  const context = {
    values,
    setValues,
    getValue,
    setValue,
    submit,
    reset,
    dirty,
    invalid,
    valid,
    errors,
    submitting,
    validationSchema,
    addBeforeUnloadListener,
    removeBeforeUnloadListener,
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  return (
    <FormContext.Provider value={context}>
      <form onSubmit={handleFormSubmit} onReset={reset}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.propTypes = {
  /** Initial form values */
  initialValues: PropTypes.object,

  /** Called when form values change. Takes form values as the first arg. */
  onChange: PropTypes.func,

  /** Called when the form is submitted. Takes form values as the first arg. */
  onSubmit: PropTypes.func,

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
   */
  validate: PropTypes.func,
};

export default FormContext;
