import { toPath, set } from 'lodash';

/**
 * Returns a copy of the given object or array setting the given value at the key.
 */
const copyWith = (object, key, value) => {
  if (object === undefined && key.match(/\d+/)) {
    return set([], key, value);
  } else if (Array.isArray(object)) {
    return set([...object], key, value);
  } else {
    return { ...object, [key]: value };
  }
};

/**
 * Works like lodash set but returns a copy instead of mutating the object.
 *
 * Does not make a deep clone of the whole object but copies only the changed parts.
 *
 * @param object the object to modify
 * @param path path of the property to set
 * @param value the value to set
 * @return copy of the object
 */
export const withValue = (object, path, value) => {
  const [key, ...rest] = Array.isArray(path) ? path : toPath(path);

  if (!key) {
    if (!object) {
      return object;
    }

    return copyWith(object, path, value);
  } else if (rest.length === 0) {
    return copyWith(object, key, value);
  } else {
    return copyWith(object, key, withValue(object[key], rest, value));
  }
};
