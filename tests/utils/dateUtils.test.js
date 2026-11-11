import {
  formatDate,
  formatDateTime,
  toDate,
  toLocalDate,
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

describe('toLocalDate', () => {
  test.each(['2025-06-03', '2025-03-30', '2025-10-26'])(
    'parses %s as a local calendar date',
    (dateString) => {
      const date = toLocalDate(dateString);

      expect(date.getFullYear()).toBe(Number(dateString.substring(0, 4)));
      expect(date.getMonth()).toBe(Number(dateString.substring(5, 7)) - 1);
      expect(date.getDate()).toBe(Number(dateString.substring(8, 10)));
      expect(toISODateStringLocal(date)).toBe(dateString);
    }
  );

  test('preserves null and undefined values', () => {
    expect(toLocalDate(null)).toBeNull();
    expect(toLocalDate(undefined)).toBeUndefined();
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
    expect(formatDate(date, 'sv')).toBe('14.4.2023');
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

describe('formatDateTime', () => {
  const date = new Date('2023-04-14T14:08:59.343Z');

  test('current language', () => {
    expect(formatDateTime(date)).toBe('14.4.2023 14.08');
  });

  test('Finnish', () => {
    expect(formatDateTime(date, 'fi')).toBe('14.4.2023 14.08');
  });

  test('Swedish', () => {
    expect(formatDateTime(date, 'sv')).toBe('14.4.2023 14.08');
  });

  test('English', () => {
    expect(formatDateTime(date, 'en')).toBe('14/04/2023, 14:08');
  });

  test("formats user's local time zone in UTC", () => {
    expect(formatDateTime(new Date('2023-04-14T00:00:00.000+0300'))).toBe(
      '13.4.2023 21.00'
    );
  });

  test('formats in time zone', () => {
    expect(formatDateTime(date, 'fi', 'Europe/Helsinki')).toBe(
      '14.4.2023 17.08'
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

  test('formats according to the active local calendar date', () => {
    const date = new Date('2023-04-14T23:00:00.000Z');
    const expectedDate = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');

    expect(toISODateStringLocal(date)).toBe(expectedDate);
  });
});
