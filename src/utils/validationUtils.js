/**
 * Returns only non-empty errors.
 *
 * @param errors errors returned from useForm hook
 * @return {string[]}
 */
export const filterEmpty = (errors) => errors.filter((error) => Boolean(error));

/**
 * Get field errors from form errors object.
 *
 * @param errors errors returned from useForm hook
 * @param path field path
 * @return {string[]}
 */
export const getErrors = (errors, path) =>
  filterEmpty((errors && errors[path]) || []);
