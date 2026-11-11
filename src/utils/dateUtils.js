import { fi, sv, enIE } from 'date-fns/locale';
import svFI from '../../src/locales/sv-FI/index.js';
import format from 'date-fns-tz/format';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import i18n from '../../src/i18n';
import { isValid } from 'date-fns';
import parseISO from 'date-fns/parseISO';

/**
 * Returns date-fns locale for the given language.
 *
 * @param {'fi'|'sv'|'en'} language
 * @return {Locale|fi|enIE|svFI}
 */
export const getDateFnsLocale = (language) => {
  switch (language) {
    case 'fi':
      return fi;
    case 'sv':
      // Date-fns does not provide sv-FI out of the box, custom locale has been created
      // Affects date format used in the date picker and other localized dates
      // Change this return value back to sv if not working as expected
      return svFI;
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
 * Parses a date-only value as a local calendar date for date picker adapters.
 *
 * @param {string|number|Date|null|undefined} date
 * @return {Date|null|undefined}
 */
export const toLocalDate = (date) => {
  if (date === null || date === undefined) {
    return date;
  } else if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return parseISO(date);
  }

  return toDate(date);
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
