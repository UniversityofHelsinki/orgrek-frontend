import {
  convertYupErrors,
  getErrors,
  mergeErrors,
  isRequired,
  getMax,
} from '../../src/utils/validationUtils';
import { object, array, string } from 'yup';

describe('getErrors', () => {
  test('errors undefined', () => {
    expect(getErrors(undefined, 'path2')).toEqual([]);
  });

  test('path undefined', () => {
    const errors = { path1: ['required'] };
    expect(getErrors(errors, 'path2')).toEqual([]);
  });

  test('empty array', () => {
    const errors = { path1: ['required'], path2: [] };
    expect(getErrors(errors, 'path2')).toEqual([]);
  });

  test('one error in array', () => {
    const errors = { path1: ['required'], path2: ['invalidValue'] };
    expect(getErrors(errors, 'path2')).toEqual(['invalidValue']);
  });

  test('multiple errors in array', () => {
    const errors = { path1: ['required'], path2: ['error1', 'error2'] };
    expect(getErrors(errors, 'path2')).toEqual(['error1', 'error2']);
  });

  test('converts string to array', () => {
    const errors = { path1: ['required'], path2: 'invalidValue' };
    expect(getErrors(errors, 'path2')).toEqual(['invalidValue']);
  });

  test('filters undefined', () => {
    const errors = { path1: ['required'], path2: ['invalidValue', undefined] };
    expect(getErrors(errors, 'path2')).toEqual(['invalidValue']);
  });
});

describe('mergeErrors', () => {
  test('first undefined', () => {
    const a = undefined;
    const b = { path1: ['required'] };
    expect(mergeErrors(a, b)).toEqual(b);
  });

  test('second undefined', () => {
    const a = { path1: ['required'] };
    const b = undefined;
    expect(mergeErrors(a, b)).toEqual(a);
  });

  test('different paths', () => {
    const a = { path1: ['error1'] };
    const b = { path2: ['error2'] };

    expect(mergeErrors(a, b)).toEqual({
      path1: ['error1'],
      path2: ['error2'],
    });
  });

  test('same keys', () => {
    const a = { path1: ['error1'] };
    const b = { path1: ['error2'] };

    expect(mergeErrors(a, b)).toEqual({
      path1: ['error1', 'error2'],
    });
  });
});

describe('convertYupErrors', () => {
  test('string', () => {
    const schema = string().required();
    const data = null;

    let errors;
    try {
      schema.validateSync(data);
    } catch (yupError) {
      errors = convertYupErrors(yupError);
    }

    expect(errors).toEqual({ '': ['this is a required field'] });
  });

  test('simple object', () => {
    const schema = object({
      value: string().required(),
    });

    const data = { value: null };

    let errors;
    try {
      schema.validateSync(data);
    } catch (yupError) {
      errors = convertYupErrors(yupError);
    }

    expect(errors).toEqual({ value: ['value is a required field'] });
  });

  test('nested object', () => {
    const schema = object({
      values: array().of(object({ value: string().required() })),
    });

    const data = {
      values: [{ value: 'foo' }, { value: null }],
    };

    let errors;
    try {
      schema.validateSync(data);
    } catch (yupError) {
      errors = convertYupErrors(yupError);
    }

    expect(errors).toEqual({
      'values[1].value': ['values[1].value is a required field'],
    });
  });

  test('translates error', () => {
    const schema = string().test({
      name: 'foo',
      // Fails always
      test: (value, context) =>
        context.createError({
          message: {
            key: 'invalidValue',
            values: { foo: value, bar: 123 },
          },
        }),
    });

    const data = 'hipsun ipsum';

    let errors;
    try {
      schema.validateSync(data);
    } catch (yupError) {
      errors = convertYupErrors(yupError);
    }

    // Interpolated values appear in the mock translation as 'key [values]'
    // See: src/__mocks__/i18n.js
    expect(errors).toEqual({ '': ['invalidValue ["hipsun ipsum",123]'] });
  });
});

describe('isRequired', () => {
  const schema = object({
    values: array().of(
      object({
        startDate: string().required(),
        endDate: string().nullable(),
      })
    ),
  });

  test('required returns true', () => {
    expect(isRequired(schema, 'values[0].startDate')).toBeTruthy();
  });

  test('nullable returns false', () => {
    expect(isRequired(schema, 'values[0].endDate')).toBeFalsy();
  });
});

describe('getMax', () => {
  const schema = object({
    values: array().of(
      object({
        value: string().required().max(50),
        startDate: string().required(),
      })
    ),
  });

  test('max defined', () => {
    expect(getMax(schema, 'values[0].value')).toBe(50);
  });

  test('max undefined', () => {
    expect(getMax(schema, 'values[0].startDate')).toBeUndefined();
  });
});
