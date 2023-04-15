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
    max: ({ max }) => {
      return { key: 'maxLength', values: { max } };
    },
  },
  date: {
    min: ({ min }) => ({
      key: 'minDate',
      values: { min: formatDate(min) },
    }),
    max: ({ max }) => ({
      key: 'maxDate',
      values: { max: formatDate(max) },
    }),
  },
});

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
/*
export const valueStartsWithSpace = (values) => {
  const errors = {};
  let arrOfNames = [...values.nameFi, ...values.nameSv, ...values.nameEn];

  arrOfNames.forEach((value) => {
    if (value.value.startsWith(' ')) {
      errors.startsWithSpace = { error: 'attribute.startsWithSpace' };
    }
  });
  return errors;
};

export const valueEndsWithSpace = (values) => {
  const errors = {};
  let arrOfNames = [...values.nameFi, ...values.nameSv, ...values.nameEn];

  arrOfNames.forEach((value) => {
    if (value.value.endsWith(' ')) {
      errors.startsWithSpace = { error: 'attribute.endsWithSpace' };
    }
  });
  return errors;
};
*/
const validStartDate = (date) => {
  if (date !== null && !isValid(date)) {
    return isValid(toDate(date));
  }
  return true;
};

const validEndDate = (date) => {
  if (date !== null && !isValid(date)) {
    return isValid(toDate(date));
  }
  return true;
};

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

addMethod(date, 'beforeEndDate', function (minDuration) {
  return this.test({
    name: 'beforeEndDate',
    params: {
      minDuration,
    },
    test: (value, context) => {
      const endDate = context.parent.endDate;
      const maxDate = isValid(endDate) ? sub(endDate, minDuration) : undefined;

      if (maxDate && isAfter(value, maxDate)) {
        return context.createError({
          message: { key: 'maxDate', values: { max: formatDate(maxDate) } },
        });
      } else {
        return true;
      }
    },
  });
});

addMethod(date, 'afterStartDate', function (minDuration) {
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
});

export const validAttributeValue = object({
  id: number().required(),
  value: string().required().max(250),
  startDate: date()
    .typeError('invalidDate')
    .required()
    .min('1600-01-01')
    .beforeEndDate({ days: 2 }),
  endDate: date()
    .typeError('invalidDate')
    .nullable()
    .afterStartDate({ days: 2 }),
  isNew: boolean().required(),
  deleted: boolean().required(),
});

export const validAttribute = array().required().of(validAttributeValue);
