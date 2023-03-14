import FormContext from '../contexts/FormContext';
import { useContext } from 'react';

/**
 * Use this hook to access form values, validation errors and other form state
 * variables.
 *
 * This hook can be used only in components inside FormContextProvider.
 */
const useForm = () => {
  return useContext(FormContext);
};

export default useForm;
