import { isValid, parse } from 'date-fns';
import { fi } from 'date-fns/locale';

export const valueNotEmpty = (values) => {
  let errors = {};

  [...values.nameFi, ...values.nameSv, ...values.nameEn].forEach((value) => {
    if (!value.value.trim()) {
      if (!errors.valueNotEmpty) {
        errors.valueNotEmpty = {};
      }

      errors.valueNotEmpty[value.id] = true;
    }
  });
};

const validStartDate = (date) => {
  if (date !== null && !isValid(date)) {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date(), { locale: fi });
    const isValidDate = isValid(parsedDate);
    return isValidDate;
  }
  return true;
};

const validEndDate = (date) => {
  if (date !== null && !isValid(date)) {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date(), { locale: fi });
    const isValidDate = isValid(parsedDate);
    return isValidDate;
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

// TODO: add validation rules here
// errors.error = t('…');
export const compareAndCheckDates = (values) => {
  let errors = {};

  let arrOfNames = [...values.nameFi, ...values.nameSv, ...values.nameEn];
  arrOfNames.forEach((elem) => {
    if (!validStartDate(elem.startDate)) {
      errors.compareAndCheckDates = { error: 'invalid date' };
    }
    if (!validEndDate(elem.endDate)) {
      errors.compareAndCheckDates = { error: 'invalid date' };
    }
    if (!compareStartAndEndDates(elem.startDate, elem.endDate, 2)) {
      errors.compareAndCheckDates = { error: 'invalid date' };
    }
  });

  return errors;
};
