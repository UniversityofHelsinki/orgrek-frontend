import { fi, sv, enIE } from 'date-fns/locale';
import format from 'date-fns-tz/format';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import i18n from '../../src/i18n';
import { isValid } from 'date-fns';

/**
 * Returns date-fns locale for the given language.
 *
 * @param {'fi'|'sv'|'en'} language
 * @return {Locale|fi|enIE|sv}
 */
export const getDateFnsLocale = (language) => {
  switch (language) {
    case 'fi':
      return fi;
    case 'sv':
      // Should use sv-FI instead of sv-SE but date-fns does not provide it out of the box
      // Affects date format used in the date picker and other localized dates
      // Change this return value if a custom sv-FI locale is created later
      return sv;
    default:
      return enIE;
  }
};

/**
 * Ensures the returned value is always a Date object.
 *
 * @param {string|number|Date|null} date either ISO string or a Date object
 * @return {Date|null}
 */
export const toDate = (date) => {
  if (date === null) {
    return null;
  } else if (typeof date === 'string' || typeof date === 'number') {
    return new Date(date);
  } else if (Object.prototype.toString.call(date) === '[object Date]') {
    return new Date(date);
  } else {
    throw new Error(`Expected string or Date but got ${date}`);
  }
};

/**
 * Returns localized date string without the time component.
 *
 * @param date Date object
 * @param {'fi'|'sv'|'en'} language if undefined, uses the current language
 * @param timeZone UTC by default
 * @param pattern date-fns format pattern
 */
export const formatDate = (
  date,
  language = undefined,
  timeZone = 'UTC',
  pattern = 'P'
) =>
  format(utcToZonedTime(toDate(date), timeZone), pattern, {
    locale: getDateFnsLocale(language || i18n.language),
    timeZone,
  });

export const formatDateTime = (date, language, timeZone) =>
  formatDate(date, language, timeZone, 'Pp');

/**
 * Returns ISO date string (in UTC) without the time component.
 *
 * @param {Date|null} date
 * @return {string|null}
 */
export const toISODateString = (date) => {
  if (date === null) {
    return null;
  } else if (!isValid(date)) {
    return 'Invalid Date';
  }

  return date.toISOString().substring(0, 10);
};

/**
 * Formats a date in user's local time zone as ISO date string without the time
 * component.
 *
 * @param {Date|null} date
 * @return {string|null}
 */
export const toISODateStringLocal = (date) => {
  if (date === null) {
    return null;
  } else if (!isValid(date)) {
    return 'Invalid Date';
  }

  return format(date, 'yyyy-MM-dd');
};
