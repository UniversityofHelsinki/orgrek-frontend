import React, { useState } from 'react';
import { createContext } from 'react';
import PropTypes from 'prop-types';

const FormContext = createContext();

export const FormContextProvider = ({
  initialValues = {},
  onSubmit,
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

    if (validate) {
      setErrors(validate(newValues) || {});
    }
  };

  const submit = () => {
    setSubmitting(true);
    onSubmit(values).finally(() => setSubmitting(false));
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
   * Called every time when the form values change.
   *
   * Takes form values as the first arg. Return an object with at least one
   * property to disable submitting.
   */
  validate: PropTypes.func.isRequired,
};

export default FormContext;
