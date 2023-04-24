import { showValidity } from '../../src/utils/showValidity';

test('the from dates render as expected', () => {
  const parseDate = showValidity('2013-12-31T20:00:00.000+00:00', null);
  expect(parseDate).toMatch(/12|31[./]12|31[./]2013from_date/);
});

test('the until dates render as expected', () => {
  const parseDate = showValidity(null, '2016-12-31 00:00:00');
  expect(parseDate).toMatch(/12|31[./]12|31[./]2016until_date/);
});

test('the time period dates render as expected', () => {
  const parseDate = showValidity(
    '2013-12-31T20:00:00.000+00:00',
    '2016-12-31 00:00:00'
  );
  expect(parseDate).toMatch(/12|31[./]12|31[./]2013 - 12|31[./]12|31[./]2016/);
});

test('the missing date message rendes as expected', () => {
  const parseDate = showValidity(null, null);
  expect(parseDate).toMatch('not_specified');
});
