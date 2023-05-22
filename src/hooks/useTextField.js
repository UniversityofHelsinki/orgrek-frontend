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
 * @return field errors and props for the text field
 */
const useTextField = ({ path, name }) => {
  const { validationSchema } = useForm();
  const { fieldPath, errors, props, setValue } = useFormField({ path, name });

  const handleLeavingFocus = (event) => {
    const newValue = event.target.value;
    if (newValue.endsWith(' ') || newValue.startsWith(' ')) {
      setValue(newValue.trim());
    }
  };

  const textFieldProps = {
    value: props.value || '',
    inputProps: { maxLength: getMax(validationSchema, fieldPath) },
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
