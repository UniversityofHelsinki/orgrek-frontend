import { string } from 'yup';
import { convertYupErrors } from '../../src/utils/validationUtils';
import {
  arrayOfAttributeValues,
  defaultSchemaForAttributes,
  validAttributeValue,
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
    expect(errors).toEqual({ '': ['minLength [4]'] });
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
  const schema = validAttributeValue;

  test.each([
    ['A'.repeat(250), []],
    ['A'.repeat(251), ['maxLength [250]']],
  ])('value results in errors #%#', (value, expectedErrors) => {
    const data = {
      ...validTestValue,
      value,
    };

    const errors = doValidate(schema, data);

    expect(errors['value'] || []).toEqual(expectedErrors);
  });

  test('min date', () => {
    const data = {
      ...validTestValue,
      startDate: '1599-12-31',
    };

    const errors = doValidate(schema, data);

    expect(errors['startDate'] || []).toEqual(['minDate ["01/01/1600"]']);
  });
});

describe('minDate', () => {
  const schema = string().date().minDate('2023-01-01').nullable();

  test.each([
    ['2023-01-01', []],
    ['2022-12-31', ['minDate ["01/01/2023"]']],
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
    ['2023-01-01', ['maxDate ["31/12/2022"]']],
    [null, []],
    [undefined, []],
  ])('%p results in validation errors %p', (value, expectedErrors) => {
    const errors = doValidate(schema, value);
    expect(errors[''] || []).toEqual(expectedErrors);
  });
});

describe('beforeEndDate', () => {
  const schema = validAttributeValue;

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
      ['maxDate ["01/01/2023"]'],
    ],
    [
      {
        startDate: '2023-01-04',
        endDate: '2023-01-03',
      },
      ['maxDate ["01/01/2023"]'],
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
  const schema = validAttributeValue;

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
      ['minDate ["03/01/2023"]'],
    ],
    [
      {
        startDate: '2023-01-01',
        endDate: '2022-12-31',
      },
      ['minDate ["03/01/2023"]'],
    ],
    [
      {
        startDate: null,
        endDate: '2023-01-03',
      },
      [],
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
