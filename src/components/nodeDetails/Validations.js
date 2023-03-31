import { isValid, parseISO } from 'date-fns';

export const valueNotEmpty = (values) => {
  const errors = {};

  [...values.nameFi, ...values.nameSv, ...values.nameEn]
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
    return isValid(parseISO(date));
  }
  return true;
};

const validEndDate = (date) => {
  if (date !== null && !isValid(date)) {
    return isValid(parseISO(date));
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

  if (endDate !== null && end_date.getTime() <= start_date.getTime()) {
    return false;
  }

  return true;
};

export const compareAndCheckDates = (values) => {
  const errors = {};

  let arrOfNames = [...values.nameFi, ...values.nameSv, ...values.nameEn];
  arrOfNames.forEach((elem) => {
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
