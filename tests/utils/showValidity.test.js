import { showValidity } from '../../src/utils/showValidity';

test('the from dates render as expected', () => {
  const parseDate = showValidity('2013-12-31', null);
  expect(parseDate).toEqual('31.12.2013 alkaen');
});

test('the until dates render as expected', () => {
  const parseDate = showValidity(null, '2016-12-31');
  expect(parseDate).toEqual('31.12.2016 asti');
});

test('the time period dates render as expected', () => {
  const parseDate = showValidity('2013-12-31', '2016-12-31');
  expect(parseDate).toEqual('31.12.2013 - 31.12.2016');
});

test('the missing date message rendes as expected', () => {
  const parseDate = showValidity(null, null);
  expect(parseDate).toEqual('Voimassaoloa ei määritetty');
});
