import get from 'lodash/get';
import { getMax } from '../utils/validationUtils';
import useForm from './useForm';
import useFormField from './useFormField';

/**
 * Provides props and validation errors for text fields.
 *
 * Can be used only inside form context.
 *
 * @param {string} path points to an object in the form values containing the field,
 * e.g. in AttributeEditor this path points to the row
 * @param {string} name refers to a field inside the object defined by the path
 * @param onChange gets called when the field value changes, receives the object
 * at path as the first argument, e.g. in AttributeEditor the whole row
 * @return field errors and props for the text field
 */
const useTextField = ({ path, name, onChange }) => {
  const { values, validationSchema } = useForm();
  const { path: fieldPath, errors, props } = useFormField({ path, name });

  const value = get(values, path, {});

  const handleChange = (event) => {
    const newValue = event.target.value;

    onChange({
      ...value,
      [name]: newValue,
    });
  };

  const handleLeavingFocus = (event) => {
    const newValue = event.target.value;
    if (newValue.endsWith(' ') || newValue.startsWith(' ')) {
      onChange({
        ...value,
        [name]: newValue.trim(),
      });
    }
  };

  const textFieldProps = {
    value: props.value || '',
    inputProps: { maxLength: getMax(validationSchema, fieldPath) },
    onChange: handleChange,
    onBlur: handleLeavingFocus,
  };

  return {
    path: fieldPath,
    errors,
    props: {
      ...props,
      ...textFieldProps,
    },
  };
};

export default useTextField;
