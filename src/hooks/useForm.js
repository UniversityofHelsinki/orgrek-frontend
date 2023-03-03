import FormContext from '../contexts/FormContext';
import { useContext } from 'react';

/**
 * Use this hook to access form value and functions
 *
 * @return {unknown}
 */
const useFormContext = () => {
  return useContext(FormContext);
};

export default useFormContext;
