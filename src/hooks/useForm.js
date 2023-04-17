import FormContext from '../contexts/FormContext';
import { useContext } from 'react';

/**
 * Use this hook to access form values, validation errors and other form state
 * variables.
 *
 * This hook should be used only in components inside FormContextProvider.
 *
 * @return an empty object if form context is not defined
 */
const useForm = () => {
  return useContext(FormContext) || {};
};

export default useForm;
