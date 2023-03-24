import React, { useState } from 'react';
import { createContext } from 'react';

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

  // Form is invalid when errors contain at least one truthy value
  const valid = Object.values(errors).every((error) => !error);

  const context = {
    values,
    setValues,
    submit,
    reset,
    dirty,
    valid,
    errors,
    submitting,
  };

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
};

export default FormContext;
