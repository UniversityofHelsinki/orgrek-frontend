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
const appendErrors = (first, second) =>
  filterEmpty([
    ...(Array.isArray(first) ? first : [first]),
    ...(Array.isArray(second) ? second : [second]),
  ]);

/**
 * Merges two FormContext validation error objects.
 */
export const mergeErrors = (a, b) => {
  const result = {};

  const appendToResult = ([key, errors]) => {
    result[key] = appendErrors(result[key], errors);
  };

  Object.entries(a || {}).forEach(appendToResult);
  Object.entries(b || {}).forEach(appendToResult);

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
 * Runs both validate function and Yup validation with the schema and merges
 * the results.
 *
 * @param values values to validate
 * @param validate optional function returning validation errors or a promise
 * @param validationSchema optional Yup validation schema
 * @param options optional Yup validation options
 * @return Promise of FormContext validation errors object
 */
export const validateAndMergeResults = (
  values,
  validate,
  validationSchema,
  options
) => {
  // Get validation errors from optional validate callback if the function is defined
  const validationResult = new Promise((resolve) =>
    resolve((validate && validate(values)) || {})
  );
  let yupValidationResult;

  // Use Yup validation if the schema is defined
  if (validationSchema) {
    yupValidationResult = validationSchema
      .validate(values, options)
      .then(() => {})
      .catch((yupError) => {
        if (yupError.name === 'ValidationError') {
          return convertYupErrors(yupError);
        } else {
          // Not a Yup ValidationError
          console.error(yupError);
          return {};
        }
      });
  } else {
    // No Yup schema defined, set errors only from validate function
    yupValidationResult = Promise.resolve({});
  }

  return Promise.all([validationResult, yupValidationResult]).then(
    ([errors, yupErrors]) => {
      return mergeErrors(errors, yupErrors);
    }
  );
};

/**
 * Checks if the given field is defined as required in the given schema.
 *
 * @param schema Yup validation schema
 * @param path field path
 * @return {boolean} true if the field is required
 */
export const isRequired = (schema, path) =>
  schema !== undefined &&
  reach(schema, path)
    .describe()
    .tests.some((test) => test.name === 'required');

/**
 * Returns the max param of the given field in the given schema.
 *
 * @param schema Yup validation schema
 * @param path field path
 * @return {number|undefined}
 */
export const getMax = (schema, path) => {
  if (!schema) {
    return undefined;
  }

  const desc = reach(schema, path).describe();
  return desc.tests.find((test) => test.name === 'max')?.params.max;
};
