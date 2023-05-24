import { withValue } from '../../src/utils/withValue';
import { set } from 'lodash';

test.each([
  { object: null, path: '', value: 'foo', expected: null },
  { object: undefined, path: '', value: 'foo', expected: undefined },
  { object: {}, path: null, value: null, expected: { null: null } },
  { object: {}, path: '', value: null, expected: { '': null } },
  { object: {}, path: '', value: undefined, expected: { '': undefined } },
  { object: {}, path: '', value: null, expected: { '': null } },
  { object: {}, path: '', value: 4, expected: { '': 4 } },
  { object: {}, path: '', value: 'foo', expected: { '': 'foo' } },
  { object: {}, path: '', value: {}, expected: { '': {} } },
  { object: {}, path: 'someKey', value: 'foo', expected: { someKey: 'foo' } },
  { object: [], path: '0', value: 'foo', expected: ['foo'] },
  { object: ['foo', 'bar'], path: '1', value: 'baz', expected: ['foo', 'baz'] },
  {
    object: { someKey: 'foo' },
    path: 'someKey',
    value: 'bar',
    expected: { someKey: 'bar' },
  },
  { object: {}, path: 'data[0]', value: 'foo', expected: { data: ['foo'] } },
  {
    object: { data: [] },
    path: 'data[0]',
    value: 'foo',
    expected: { data: ['foo'] },
  },
  {
    object: { data: ['foo'] },
    path: 'data[0]',
    value: 'bar',
    expected: { data: ['bar'] },
  },
  {
    object: { data: ['foo'] },
    path: 'data[1]',
    value: 'bar',
    expected: { data: ['foo', 'bar'] },
  },
  {
    object: { data: [{}, {}] },
    path: 'data[0].someKey',
    value: 'foo',
    expected: { data: [{ someKey: 'foo' }, {}] },
  },
  {
    object: { data: [{ someKey: 'foo' }, { someKey: 'bar' }] },
    path: 'data[0].someKey',
    value: 'baz',
    expected: { data: [{ someKey: 'baz' }, { someKey: 'bar' }] },
  },
  {
    object: { data: [{}, {}] },
    path: 'data[0].someKey',
    value: { subKey: 'foo' },
    expected: { data: [{ someKey: { subKey: 'foo' } }, {}] },
  },
  {
    object: { data: [[], []] },
    path: 'data[0][1]',
    value: 'foo',
    expected: { data: [[undefined, 'foo'], []] },
  },
  {
    object: { data: [[], []] },
    path: 'data[1][0]',
    value: 'foo',
    expected: { data: [[], ['foo']] },
  },
  {
    object: { data: [[], ['foo', 'bar']] },
    path: 'data[1][0]',
    value: 'baz',
    expected: { data: [[], ['baz', 'bar']] },
  },
  {
    object: { data: [{}, {}] },
    path: 'data[0]',
    value: null,
    expected: { data: [null, {}] },
  },
  {
    object: { data: [{}, {}] },
    path: 'data',
    value: [],
    expected: { data: [] },
  },
  {
    object: { data: [{}, {}] },
    path: 'data',
    value: null,
    expected: { data: null },
  },
])('withValue %j', ({ object, path, value, expected }) => {
  const actual = withValue(object, path, value);

  // Assert equal behavior with `get` from lodash
  expect(set(object, path, value)).toEqual(expected);

  if (actual) {
    expect(actual).not.toBe(object);
  }

  expect(actual).toEqual(expected);
});
