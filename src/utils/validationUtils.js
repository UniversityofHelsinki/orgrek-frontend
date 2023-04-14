import { reach } from 'yup';
import i18n from '../i18n';

const { t } = i18n;

/**
 * Returns only non-empty errors.
 *
 * @param errors errors returned from useForm hook
 * @return {string[]}
 */
const filterEmpty = (errors) => errors.filter((error) => Boolean(error));

/**
 * Get field errors from FormContext errors.
 *
 * @param errors errors returned from useForm hook
 * @param path field path
 * @return {string[]}
 */
export const getErrors = (errors, path) => {
  if (!errors) {
    return [];
  }

  const fieldErrors = errors[path];

  if (!fieldErrors) {
    return [];
  }

  return filterEmpty(Array.isArray(fieldErrors) ? fieldErrors : [fieldErrors]);
};

/**
 * Translates yup validation errors.
 *
 * @param errors array of string or key-values objects
 * @return {string[]} array of translated errors
 */
const translateErrors = (errors) =>
  errors.map((message) => {
    if (typeof message === 'string') {
      return t(message);
    }

    const { key, values } = message;

    return t(key, values);
  });

/**
 * Appends the second array of error messages to the first array
 */
const appendErrors = (first, second) => [
  ...(Array.isArray(first) ? first : []),
  ...(Array.isArray(second) ? second : []),
];

/**
 * Merges two FormContext validation error objects.
 */
export const mergeErrors = (a, b) => {
  const result = { ...(a || {}) };

  Object.entries(b || {}).forEach(([key, errors]) => {
    result[key] = appendErrors(result[key], errors);
  });

  return result;
};

/**
 * Converts Yup error to FormContext validation errors.
 *
 * See https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string
 *
 * @param yupError Yup validation error
 * @return FormContext validation errors object
 */
export const convertYupErrors = (yupError) => {
  let result = {};

  if (yupError.errors.length > 0) {
    result[yupError.path] = translateErrors(yupError.errors);
  }

  // Flatten nested errors recursively
  yupError.inner.forEach((inner) => {
    result = mergeErrors(result, convertYupErrors(inner));
  });

  return result;
};

/**
 * Checks if the given field is defined as required in the given schema.
 *
 * @param schema Yup validation schema
 * @param path field path
 * @return {boolean} true if the field is required
 */
export const isRequired = (schema, path) =>
  reach(schema, path)
    .describe()
    .tests.some((test) => test.name === 'required');

/**
 * Returns the max param of the given field in the given schema.
 *
 * @param schema Yup validation schema
 * @param path field path
 * @return {*}
 */
export const getMax = (schema, path) => {
  const desc = reach(schema, path).describe();
  return desc.tests.find((test) => test.name === 'max')?.params.max;
};
