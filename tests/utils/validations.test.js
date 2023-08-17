import { boolean, number, object, string } from 'yup';
import { convertYupErrors } from '../../src/utils/validationUtils';
import {
  arrayOfAttributeValues,
  defaultSchemaForAttributes,
  attributeSchema,
} from '../../src/utils/validations';

const validTestValue = {
  id: 1,
  key: 'key1',
  value: 'foo',
  startDate: '2023-01-01',
  endDate: null,
  isNew: false,
  deleted: false,
};

const doValidate = (schema, value) => {
  let errors = {};
  try {
    schema.validateSync(value, { abortEarly: false });
  } catch (yupError) {
    if (yupError.name === 'ValidationError') {
      errors = convertYupErrors(yupError);
    } else {
      // Not a Yup ValidationError
      console.error(yupError);
      return {};
    }
  }

  return errors;
};

describe('min', () => {
  test('translation', () => {
    const schema = string().min(4);
    const errors = doValidate(schema, 'foo');
    expect(errors).toEqual({ '': ['minLength'] });
  });
});

describe('date string', () => {
  const schema = string().date();

  test('valid', () => {
    const errors = doValidate(schema, '2023-01-01');
    expect(errors).toEqual({});
  });

  test('nullable', () => {
    const errors = doValidate(schema.nullable(), null);
    expect(errors).toEqual({});
  });

  test('required', () => {
    const errors = doValidate(schema.required(), null);
    expect(errors).toEqual({ '': ['attribute.required'] });
  });

  test('invalid date', () => {
    const errors = doValidate(schema.required(), 'invalid date');
    expect(errors).toEqual({ '': ['invalidDate'] });
  });

  test('cast returns ISO date string', () => {
    expect(schema.cast('2023-01-01')).toBe('2023-01-01');
  });

  test('cast full representation returns ISO date string', () => {
    expect(schema.cast('2023-01-01T00:00:00Z')).toBe('2023-01-01');
  });
});

describe('validAttributeValue', () => {
  const schema = attributeSchema;

  const valid = []; // no errors

  test.each([
    { value: '', expected: ['attribute.required'] },
    { value: ' ', expected: ['attribute.required'] },
    { value: '\n', expected: ['attribute.required'] },
    { value: '\t', expected: ['attribute.required'] },
    { value: '\xa0', expected: ['attribute.required'] }, // nbsp
    { value: 'A', expected: valid },
    { value: 'A'.repeat(250), expected: valid },
    { value: 'A'.repeat(251), expected: ['maxLength'] },
  ])('value %j', ({ value, expected }) => {
    const data = {
      ...validTestValue,
      value,
    };

    const errors = doValidate(schema, data);

    expect(errors['value'] || []).toEqual(expected);
  });

  test('min date', () => {
    const data = {
      ...validTestValue,
      startDate: '1599-12-31',
    };

    const errors = doValidate(schema, data);

    expect(errors['startDate'] || []).toEqual(['minDate']);
  });

  test('startDate after endDate', () => {
    const data = {
      ...validTestValue,
      startDate: '2023-01-02',
      endDate: '2023-01-01',
    };

    const errors = doValidate(schema, data);

    expect(errors).toEqual({
      startDate: ['maxDate'],
      endDate: ['minDate'],
    });
  });
});

describe('minDate', () => {
  const schema = string().date().minDate('2023-01-01').nullable();

  test.each([
    ['2023-01-01', []],
    ['2022-12-31', ['minDate']],
    [null, []],
    [undefined, []],
  ])('%p results in validation errors %p', (value, expectedErrors) => {
    const errors = doValidate(schema, value);
    expect(errors[''] || []).toEqual(expectedErrors);
  });
});

describe('maxDate', () => {
  const schema = string().date().maxDate('2022-12-31').nullable();

  test.each([
    ['2022-12-31', []],
    ['2023-01-01', ['maxDate']],
    [null, []],
    [undefined, []],
  ])('%p results in validation errors %p', (value, expectedErrors) => {
    const errors = doValidate(schema, value);
    expect(errors[''] || []).toEqual(expectedErrors);
  });
});

describe('beforeEndDate', () => {
  const schema = attributeSchema;

  test.each([
    [
      {
        startDate: '2023-01-01',
        endDate: '2023-01-03',
      },
      [],
    ],
    [
      {
        startDate: '2023-01-02',
        endDate: '2023-01-03',
      },
      ['maxDate'],
    ],
    [
      {
        startDate: '2023-01-04',
        endDate: '2023-01-03',
      },
      ['maxDate'],
    ],
    [
      {
        startDate: '2023-01-04',
        endDate: null,
      },
      [],
    ],
  ])('%p results in validation errors %p', (values, expectedErrors) => {
    const data = {
      ...validTestValue,
      ...values,
    };

    const errors = doValidate(schema, data);

    expect(errors['startDate'] || []).toEqual(expectedErrors);
  });
});

describe('afterStartDate', () => {
  const schema = object({
    startDate: string()
      .date()
      .nullable()
      .minDate('1600-01-01')
      .beforeEndDate({ days: 2 }),
    endDate: string()
      .date()
      .nullable()
      .afterStartDate({ days: 2 }, '1600-01-01'),
  });

  test.each([
    [
      {
        startDate: '2023-01-01',
        endDate: '2023-01-03',
      },
      [],
    ],
    [
      {
        startDate: '2023-01-01',
        endDate: '2023-01-02',
      },
      ['minDate'],
    ],
    [
      {
        startDate: '2023-01-01',
        endDate: '2022-12-31',
      },
      ['minDate'],
    ],
    [
      {
        startDate: null,
        endDate: '2023-01-03',
      },
      [],
    ],
    [
      {
        startDate: null,
        endDate: '1500-01-01',
      },
      ['minDate'],
    ],
  ])('%p results in validation errors %s', (values, expectedErrors) => {
    const data = {
      ...validTestValue,
      ...values,
    };

    const errors = doValidate(schema, data);

    expect(errors['endDate'] || []).toEqual(expectedErrors);
  });
});

describe('arrayOfAttributeValues', () => {
  test('filters new deleted rows', () => {
    const schema = arrayOfAttributeValues;
    const data = [
      validTestValue,
      { ...validTestValue, id: -1, isNew: true, deleted: true },
    ];

    expect(schema.cast(data)).toEqual([validTestValue]);
  });

  test('does not filter new rows', () => {
    const schema = arrayOfAttributeValues;
    const data = [validTestValue, { ...validTestValue, id: -1, isNew: true }];

    expect(schema.cast(data)).toEqual(data);
  });

  test('does not filter deleted rows', () => {
    const schema = arrayOfAttributeValues;
    const data = [validTestValue, { ...validTestValue, id: 2, deleted: true }];

    expect(schema.cast(data)).toEqual(data);
  });

  test('all values have the same key', () => {
    const schema = arrayOfAttributeValues;
    const data = [validTestValue, { ...validTestValue, id: 2 }];

    const errors = doValidate(schema, data);
    expect(errors).toEqual({});
  });

  test('values with different keys', () => {
    const schema = arrayOfAttributeValues;
    const data = [validTestValue, { ...validTestValue, id: 2, key: 'key2' }];

    const errors = doValidate(schema, data);

    expect(errors[''] || []).toEqual(['attribute.multipleKeys']);
  });
});

describe('defaultSchemaForAttributes', () => {
  const schema = defaultSchemaForAttributes(['key1', 'key2']);

  test('valid', () => {
    const data = {
      key1: [validTestValue],
      key2: [],
    };

    const errors = doValidate(schema, data);

    expect(errors).toEqual({});
  });

  test('invalid', () => {
    const data = {
      key1: [], // empty array should be valid
      key2: [{}], // value object missing all props
    };

    const errors = doValidate(schema, data);

    expect(errors).toEqual({
      'key2[0].id': ['attribute.required'],
      'key2[0].key': ['attribute.required'],
      'key2[0].value': ['attribute.required'],
      'key2[0].startDate': ['attribute.required'],
      'key2[0].isNew': ['attribute.required'],
      'key2[0].deleted': ['attribute.required'],
    });
  });
});
