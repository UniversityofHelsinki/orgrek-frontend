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
 * @param onChange gets called when the field value changes, receives the object
 * at path as the first argument, e.g. in AttributeEditor the whole row
 * @return field errors and common field props (value, required and error)
 */
const useFormField = ({ path, name, onChange }) => {
  const { values, errors, validationSchema } = useForm();

  const fieldPath = `${path}.${name}`;
  const value = get(values, path, {});
  const fieldErrors = getErrors(errors, fieldPath);

  // TODO: Consider calling setValues from useForm hook directly instead.
  // Possibly could use `set` from lodash for that but we cannot mutate
  // `values`, so would have to make a deep copy of values first.
  const handleChange = (newValue) => {
    onChange({
      ...value,
      [name]: newValue,
    });
  };

  const props = {
    value: value[name],
    required: isRequired(validationSchema, fieldPath),
    error: fieldErrors.length > 0,
    onChange: handleChange,
  };

  return { fieldPath, errors: fieldErrors, props };
};

export default useFormField;
