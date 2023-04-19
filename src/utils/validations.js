import isValid from 'date-fns/isValid';
import add from 'date-fns/add';
import sub from 'date-fns/sub';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import {
  object,
  array,
  string,
  date,
  number,
  boolean,
  setLocale,
  addMethod,
} from 'yup';
import { formatDate, toDate } from './dateUtils';

// Customize yup validation error messages
// Message is either a translation key or an object containing the key and
// variable values for interpolation
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
  date: {
    min: ({ min }) => ({
      key: 'minDate',
      // Values available for interpolation in the text
      values: { min: formatDate(min) },
    }),
    max: ({ max }) => ({
      key: 'maxDate',
      // Values available for interpolation in the text
      values: { max: formatDate(max) },
    }),
  },
});

/** @deprecated use Yup schema instead */
export const valueNotEmpty = (values) => {
  const errors = {};

  values
    .filter((value) => !value.deleted)
    .forEach((value) => {
      if (value.value === null) {
        errors.valueNotEmpty = {};
      } else if (!value.value.trim()) {
        if (!errors.valueNotEmpty) {
          errors.valueNotEmpty = {};
        }

        errors.valueNotEmpty[value.id] = true;
      }
    });
  return errors;
};

/** @deprecated use Yup schema instead */
const validStartDate = (date) => {
  if (date !== null && !isValid(date)) {
    return isValid(toDate(date));
  }
  return true;
};

/** @deprecated use Yup schema instead */
const validEndDate = (date) => {
  if (date !== null && !isValid(date)) {
    return isValid(toDate(date));
  }
  return true;
};

/** @deprecated use Yup schema instead */
const compareStartAndEndDates = (startDate, endDate, days) => {
  if (startDate === null && endDate === null) {
    return true;
  }

  const start_date = new Date(startDate);
  start_date.setDate(start_date.getDate() + days);
  start_date.setHours(0, 0, 0, 0);

  const end_date = new Date(endDate);
  end_date.setHours(0, 0, 0, 0);

  if (endDate !== null && start_date.getTime() >= end_date.getTime()) {
    return false;
  }

  start_date.setDate(start_date.getDate() - days);
  end_date.setDate(end_date.getDate() - days);

  return !(endDate !== null && end_date.getTime() <= start_date.getTime());
};

/** @deprecated use Yup schema instead */
export const compareAndCheckDates = (values) => {
  const errors = {};

  values.forEach((elem) => {
    if (!elem.startDate) {
      errors.compareAndCheckDates = { error: 'start date required' };
      return;
    }
    if (!validStartDate(elem.startDate)) {
      errors.compareAndCheckDates = { error: 'invalid date' };
    }
    if (!validEndDate(elem.endDate)) {
      errors.compareAndCheckDates = { error: 'invalid date' };
    }
    if (!compareStartAndEndDates(elem.startDate, elem.endDate, 1)) {
      errors.compareAndCheckDates = { error: 'invalid date' };
    }
  });

  return errors;
};

addMethod(
  date,
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
        const endDate = context.parent.endDate;
        const maxDate = isValid(endDate)
          ? sub(endDate, minDuration)
          : undefined;

        if (maxDate && isAfter(value, maxDate)) {
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
  date,
  'afterStartDate',
  /**
   * Validates attribute value end date is after end date.
   *
   * Use this test on attribute value endDate.
   *
   * @param minDuration date-fns duration object specifying minimum duration
   * (e.g. days) between the start and the end dates
   */
  function (minDuration) {
    return this.test({
      name: 'afterStartDate',
      params: {
        minDuration,
      },
      test: (value, context) => {
        const startDate = context.parent.startDate;
        const minDate = isValid(startDate)
          ? add(startDate, minDuration)
          : undefined;

        if (minDate && isBefore(value, minDate)) {
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

export const attributeValidityDate = date()
  .typeError('invalidDate')
  .transform((value, originalValue) => toDate(originalValue));

export const validAttributeValue = object({
  id: number().required(),
  key: string().required(),
  value: string().required().max(250), // TODO: trim
  // TODO: transform dates to ISO date strings
  startDate: attributeValidityDate
    .required()
    .min(toDate('1600-01-01'))
    .beforeEndDate({ days: 2 }),
  endDate: attributeValidityDate.nullable().afterStartDate({ days: 2 }),
  isNew: boolean().required(),
  deleted: boolean().required(),
});

// TODO: transform to filter new deleted values
export const arrayOfAttributeValues = array()
  .required()
  .of(validAttributeValue);

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
