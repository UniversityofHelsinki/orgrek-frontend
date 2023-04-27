import {
  formatDate,
  toDate,
  toISODateString,
  toISODateStringLocal,
} from '../../src/utils/dateUtils';

describe('toDate', () => {
  test('null', () => {
    expect(toDate(null)).toBeNull();
  });

  test('from string without time', () => {
    expect(toDate('2023-04-14').toISOString()).toEqual(
      '2023-04-14T00:00:00.000Z'
    );
  });

  test('from string with time', () => {
    expect(toDate('2023-04-14T12:30:14.095Z').toISOString()).toEqual(
      '2023-04-14T12:30:14.095Z'
    );
  });

  test('from number', () => {
    expect(toDate(1681475414095).toISOString()).toEqual(
      '2023-04-14T12:30:14.095Z'
    );
  });

  test('from date', () => {
    expect(toDate(new Date('2023-04-14T00:00:00.000Z')).toISOString()).toEqual(
      '2023-04-14T00:00:00.000Z'
    );
  });

  test('invalid value', () => {
    expect(() => toDate({})).toThrowError(
      'Expected string or Date but got [object Object]'
    );
  });
});

describe('formatDate', () => {
  const date = new Date('2023-04-14T00:00:00.000Z');

  test('current language', () => {
    expect(formatDate(date)).toBe('14.4.2023');
  });

  test('Finnish', () => {
    expect(formatDate(date, 'fi')).toBe('14.4.2023');
  });

  test('Swedish', () => {
    expect(formatDate(date, 'sv')).toBe('2023-04-14');
  });

  test('English', () => {
    expect(formatDate(date, 'en')).toBe('14/04/2023');
  });

  test('formats in UTC', () => {
    expect(formatDate(new Date('2023-04-14T23:00:00.000Z'))).toBe('14.4.2023');
  });

  test("formats user's local time zone in UTC", () => {
    expect(formatDate(new Date('2023-04-14T00:00:00.000+0200'))).toBe(
      '13.4.2023'
    );
  });
});

describe('toISODateString', () => {
  test('null', () => {
    expect(toISODateString(null)).toBeNull();
  });

  test('invalid date', () => {
    expect(toISODateString(new Date(''))).toBe('Invalid Date');
  });

  test('returns date without the time component', () => {
    const date = new Date('2023-04-14T00:00:00.000Z');
    expect(toISODateString(date)).toBe('2023-04-14');
  });

  test('formats in UTC', () => {
    const date = new Date('2023-04-14T23:00:00.000Z');
    expect(toISODateString(date)).toBe('2023-04-14');
  });

  test("formats user's local time zone in UTC", () => {
    const date = new Date('2023-04-14T00:00:00.000+0200');
    expect(toISODateString(date)).toBe('2023-04-13');
  });
});

describe('toISODateStringLocal', () => {
  test('null', () => {
    expect(toISODateStringLocal(null)).toBeNull();
  });

  test('invalid date', () => {
    expect(toISODateStringLocal(new Date(''))).toBe('Invalid Date');
  });

  test('returns date without the time component', () => {
    const date = new Date();
    date.setFullYear(2023, 3, 14);
    date.setHours(0, 0, 0, 0);
    expect(toISODateStringLocal(date)).toBe('2023-04-14');
  });

  test("converts UTC to user's local time zone", () => {
    const date = new Date('2023-04-14T23:00:00.000Z');
    // This tests expects user's time zone to be Europe/Helsinki
    expect(date.getTimezoneOffset()).toBeLessThan(0);
    expect(toISODateStringLocal(date)).toBe('2023-04-15');
  });
});
