import useForm from './useForm';
import { getErrors, isRequired } from '../utils/validationUtils';

const isEvent = (value) =>
  Boolean(
    value &&
      typeof value === 'object' &&
      value.target &&
      (value instanceof Event || value.nativeEvent)
  );

/**
 * Provides errors and common props for form fields.
 *
 * Can be used only inside form context.
 *
 * @param {string} path points to an object in the form values containing the field,
 * e.g. in AttributeEditor this path points to the row. Pass empty or undefined
 * path to point to the root of form values.
 * @param {string} name refers to a field inside the object defined by the path
 * @return field errors and common field props (value, required and error)
 */
const useFormField = ({ path, name }) => {
  const { getValue, setValue, errors, validationSchema } = useForm();

  const fieldPath = path ? `${path}.${name}` : name;
  const value = getValue(fieldPath);
  const fieldErrors = getErrors(errors, fieldPath);

  const setFieldValue = (newValue) => {
    if (isEvent(newValue)) {
      setValue(fieldPath, newValue.target.value);
    } else {
      setValue(fieldPath, newValue);
    }
  };

  const props = {
    value,
    required: isRequired(validationSchema, fieldPath),
    error: fieldErrors.length > 0,
    onChange: setFieldValue,
  };

  return {
    fieldPath,
    errors: fieldErrors,
    props,
    value,
    setValue: setFieldValue,
  };
};

export default useFormField;
