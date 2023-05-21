import get from 'lodash/get';
import useForm from './useForm';
import { getErrors, isRequired } from '../utils/validationUtils';

/**
 * Provides errors and common props for form fields.
 *
 * Can be used only inside form context.
 *
 * @param {string} path points to an object in the form values containing the field,
 * e.g. in AttributeEditor this path points to the row
 * @param {string} name refers to a field inside the object defined by the path
 * @return field errors and common field props (value, required and error)
 */
const useFormField = ({ path, name }) => {
  const { values, errors, validationSchema } = useForm();

  const fieldPath = `${path}.${name}`;
  const value = get(values, fieldPath, null);
  const fieldErrors = getErrors(errors, fieldPath);

  const props = {
    value,
    required: isRequired(validationSchema, fieldPath),
    error: fieldErrors.length > 0,
  };

  return { path: fieldPath, errors: fieldErrors, props };
};

export default useFormField;
