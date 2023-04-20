import React, { useState } from 'react';
import { createContext } from 'react';
import PropTypes from 'prop-types';
import { validateAndMergeResults } from '../utils/validationUtils';

const FormContext = createContext();

export const FormContextProvider = ({
  initialValues = {},
  onSubmit,
  validationSchema,
  validate,
  children,
}) => {
  const [values, setValuesState] = useState(initialValues);
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setValues = (newValues) => {
    setDirty(true);
    setValuesState(newValues);

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

  const submit = async () => {
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
    submit,
    reset,
    dirty,
    invalid,
    valid,
    errors,
    submitting,
    validationSchema,
  };

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
};

FormContextProvider.propTypes = {
  /** Initial form values */
  initialValues: PropTypes.object,

  /** Called when the form is submitted. Takes form values as the first arg. */
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
   */
  validate: PropTypes.func,
};

export default FormContext;
