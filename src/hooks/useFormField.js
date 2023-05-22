import get from 'lodash/get';
import useForm from './useForm';
import { getErrors, isRequired } from '../utils/validationUtils';

/**
 * Provides errors and common props for form fields.
 *
 * Can be used only inside form context.
 *
 * @param {string} path points to an object in the form values containing the field,
 * e.g. in AttributeEditor this path points to the row. Pass empty or undefined
 * path to point to the root of form values.
 * @param {string} name refers to a field inside the object defined by the path
 * @param onChange gets called when the field value changes, receives the object
 * at path as the first argument, e.g. in AttributeEditor the whole row
 * @return field errors and common field props (value, required and error)
 */
const useFormField = ({ path, name, onChange }) => {
  const { values, setValues, errors, validationSchema } = useForm();

  const fieldPath = path ? `${path}.${name}` : name;
  const value = path ? get(values, path, {}) : values;
  const fieldErrors = getErrors(errors, fieldPath);

  // TODO: Consider calling setValues from useForm hook directly instead.
  // Possibly could use `set` from lodash for that but we cannot mutate
  // `values`, so would have to make a deep copy of values first.
  const handleChange = (newValue) => {
    const newValues = {
      ...value,
      [name]: newValue,
    };

    // If path is empty, we can simply update values in the root values object
    if (!path) {
      setValues(newValues);
    }

    onChange && onChange(newValues);
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
