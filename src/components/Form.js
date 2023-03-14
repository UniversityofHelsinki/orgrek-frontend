import React from 'react';
import useFormContext from '../hooks/useForm';

const Form = ({ children }) => {
  const { submit, reset } = useFormContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  return (
    <form onSubmit={handleSubmit} onReset={reset}>
      {children}
    </form>
  );
};

export default Form;
