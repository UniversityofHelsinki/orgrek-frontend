import isValid from 'date-fns/isValid';
import add from 'date-fns/add';
import sub from 'date-fns/sub';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import {
  object,
  array,
  string,
  number,
  boolean,
  setLocale,
  addMethod,
} from 'yup';
import { formatDate, toDate, toISODateString } from './dateUtils';
import { flattenAttributes } from './attributeUtils';

// Customize yup validation error messages
// Message is either a translation key or an object containing the key and
// variable values for interpolation
// See all possible messages: https://github.com/jquense/yup/blob/master/src/locale.ts
setLocale({
  mixed: {
    default: 'invalid',
    required: 'attribute.required',
  },
  string: {
    min: ({ min }) => ({
      key: 'minLength',
      // Values available for interpolation in the text
      values: { min },
    }),
    max: ({ max }) => ({
      key: 'maxLength',
      // Values available for interpolation in the text
      values: { max },
    }),
  },
});

// addMethod registers custom validation functions that can be used in the schema
// See https://github.com/jquense/yup#addmethodschematype-schema-name-string-method--schema-void
addMethod(
  string,
  'minDate',
  /**
   * Validates minimum date.
   *
   * @param {string|Date} min earliest allowed date
   */
  function (min) {
    return this.test({
      name: 'minDate',
      params: {
        min, // Used by getMin util
      },
      test: (value, context) => {
        if (value === null || value === undefined) {
          return true;
        }

        if (isBefore(toDate(value), toDate(min))) {
          return context.createError({
            message: { key: 'minDate', values: { min: formatDate(min) } },
          });
        }

        return true;
      },
    });
  }
);

addMethod(
  string,
  'maxDate',
  /**
   * Validates maximum date.
   *
   * @param {string|Date} max latest allowed date
   */
  function (max) {
    return this.test({
      name: 'maxDate',
      params: {
        max, // Used by getMax util
      },
      test: (value, context) => {
        if (value === null || value === undefined) {
          return true;
        }

        if (isAfter(toDate(value), toDate(max))) {
          return context.createError({
            message: { key: 'maxDate', values: { max: formatDate(max) } },
          });
        }

        return true;
      },
    });
  }
);

addMethod(
  string,
  'beforeEndDate',
  /**
   * Validates attribute value start date is before end date.
   *
   * Use this test on attribute value startDate.
   *
   * @param minDuration date-fns duration object specifying minimum duration
   * (e.g. days) between the start and the end dates
   */
  function (minDuration) {
    return this.test({
      name: 'beforeEndDate',
      params: {
        minDuration,
      },
      test: (value, context) => {
        const endDate = toDate(context.parent.endDate || null);
        const maxDate = isValid(endDate)
          ? sub(endDate, minDuration)
          : undefined;

        if (maxDate && isAfter(toDate(value), maxDate)) {
          return context.createError({
            message: { key: 'maxDate', values: { max: formatDate(maxDate) } },
          });
        } else {
          return true;
        }
      },
    });
  }
);

addMethod(
  string,
  'afterStartDate',
  /**
   * Validates attribute value end date is after end date.
   *
   * Use this test on attribute value endDate.
   *
   * @param minDuration date-fns duration object specifying minimum duration
   * (e.g. days) between the start and the end dates
   * @param min minimum date if start date is null
   */
  function (minDuration, min) {
    return this.test({
      name: 'afterStartDate',
      params: {
        minDuration,
        min,
      },
      test: (value, context) => {
        const startDate = toDate(context.parent.startDate || null);
        const minDate = isValid(startDate)
          ? add(startDate, minDuration)
          : min
          ? toDate(min)
          : undefined;

        if (minDate && isBefore(toDate(value), minDate)) {
          return context.createError({
            message: { key: 'minDate', values: { min: formatDate(minDate) } },
          });
        } else {
          return true;
        }
      },
    });
  }
);

addMethod(
  string,
  'date',
  /**
   * Yup schema for ISO 8601 date string.
   *
   * Use string() instead of date() because Yup does not support converting
   * Date object back to ISO string after the validation.
   * See https://github.com/jquense/yup/issues/1442
   */
  function () {
    return this.transform((value) => toISODateString(toDate(value))).test({
      name: 'dateString',
      message: 'invalidDate',
      test: (value) => {
        return value === null || value === undefined || isValid(toDate(value));
      },
    });
  }
);

addMethod(
  array,
  'filterDeletedNew',
  /**
   * Filters out new and deleted attributes values because we do not want to
   * post those to the backend.
   */
  function () {
    return this.transform((attributes) =>
      attributes.filter((attribute) => !(attribute.isNew && attribute.deleted))
    );
  }
);

addMethod(
  array,
  'sameKey',
  /**
   * Checks that all attribute values in one array have the same key
   */
  function () {
    return this.test({
      name: 'sameKey',
      test: (attributes, context) => {
        const keys = attributes
          .map((attribute) => attribute.key)
          .filter((key, index, keys) => keys.indexOf(key) === index);

        if (keys.length > 1) {
          return context.createError({
            message: {
              key: 'attribute.multipleKeys',
              values: { keys: keys.join(', ') },
            },
          });
        }

        return true;
      },
    });
  }
);

/**
 * Validation schema for one attribute value
 */
export const attributeSchema = object({
  id: number().required(),
  key: string().required(),
  value: string().trim().required().max(250),
  startDate: string()
    .date()
    .required()
    .minDate('1600-01-01')
    .beforeEndDate({ days: 2 }),
  endDate: string().date().nullable().afterStartDate({ days: 2 }),
  isNew: boolean().required(),
  deleted: boolean().required(),
});

/**
 * Validation schema for all values of one attribute (all values having the same key)
 */
export const arrayOfAttributeValues = array()
  .of(attributeSchema)
  .required()
  .filterDeletedNew()
  .sameKey();

/**
 * Builds a schema dynamically for the given attribute keys.
 *
 * This schema expects form values to be an object containing the given keys
 * and attribute values in arrays separately for each key.
 *
 * keys = ['key1', 'key2'];
 * values = {
 *   key1: [{...}, {...}, ...],
 *   key2: [{...}, {...}, ...],
 * };
 *
 * @param {string[]} keys
 * @return Yup validation schema
 */
export const defaultSchemaForAttributes = (keys) =>
  object(
    keys.reduce((schema, key) => {
      schema[key] = arrayOfAttributeValues;
      return schema;
    }, {})
  );

const atLeastOneNotDeleted = (input) => {
  return Object.getOwnPropertyNames(input).every((name) =>
    input[name].some((name) => !name.deleted)
  );
};

export const nameAttributeSchema = (keys) =>
  defaultSchemaForAttributes(keys).test(
    'arrays-not-empty',
    'all values are empty.',
    atLeastOneNotDeleted
  );

export const nodeValiditySchema = object({
  startDate: string()
    .date()
    .required()
    .minDate('1600-01-01')
    .beforeEndDate({ days: 2 }),
  endDate: string().date().nullable().afterStartDate({ days: 2 }, '1600-01-01'),
});

export const successorSchema = object({
  id: number().required(),
  key: string().required(),
  value: object({
    id: number().required(),
    name: string().required(),
  }).required(),
  startDate: string().date().required().minDate('1600-01-01'),
  isNew: boolean().required(),
  deleted: boolean().required(),
});

export const successorsSchema = (keys) => {
  const arrayOfSuccessors = array()
    .of(attributeSchema)
    .required()
    .filterDeletedNew();
  object(
    keys.reduce((schema, key) => {
      schema[key] = arrayOfSuccessors;
      return schema;
    }, {})
  );
};
export const newNodeValiditySchema = object({
  startDate: string().date().minDate('1600-01-01'),
  nameFi: string().required(),
  nameEn: string().required(),
  nameSv: string().required(),
});
