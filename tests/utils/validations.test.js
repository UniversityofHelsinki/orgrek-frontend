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
    expect(errors).toEqual({ '': ['Vähimmäispituus 4 merkkiä'] });
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
    expect(errors).toEqual({ '': ['Pakollinen tieto'] });
  });

  test('invalid date', () => {
    const errors = doValidate(schema.required(), 'invalid date');
    expect(errors).toEqual({ '': ['Virheellinen päivämäärä'] });
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
    { value: '', expected: ['Pakollinen tieto'] },
    { value: ' ', expected: ['Pakollinen tieto'] },
    { value: '\n', expected: ['Pakollinen tieto'] },
    { value: '\t', expected: ['Pakollinen tieto'] },
    { value: '\xa0', expected: ['Pakollinen tieto'] }, // nbsp
    { value: 'A', expected: valid },
    { value: 'A'.repeat(250), expected: valid },
    { value: 'A'.repeat(251), expected: ['Enimmäispituus 250 merkkiä'] },
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

    expect(errors['startDate'] || []).toEqual([
      'Päivämäärä voi olla aikaisintaan 1.1.1600',
    ]);
  });

  test('startDate after endDate', () => {
    const data = {
      ...validTestValue,
      startDate: '2023-01-02',
      endDate: '2023-01-01',
    };

    const errors = doValidate(schema, data);

    expect(errors).toEqual({
      startDate: ['Päivämäärä voi olla korkeintaan 30.12.2022'],
      endDate: ['Päivämäärä voi olla aikaisintaan 4.1.2023'],
    });
  });
});

describe('minDate', () => {
  const schema = string().date().minDate('2023-01-01').nullable();

  test.each([
    ['2023-01-01', []],
    ['2022-12-31', ['Päivämäärä voi olla aikaisintaan 1.1.2023']],
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
    ['2023-01-01', ['Päivämäärä voi olla korkeintaan 31.12.2022']],
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
      ['Päivämäärä voi olla korkeintaan 1.1.2023'],
    ],
    [
      {
        startDate: '2023-01-04',
        endDate: '2023-01-03',
      },
      ['Päivämäärä voi olla korkeintaan 1.1.2023'],
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
      ['Päivämäärä voi olla aikaisintaan 3.1.2023'],
    ],
    [
      {
        startDate: '2023-01-01',
        endDate: '2022-12-31',
      },
      ['Päivämäärä voi olla aikaisintaan 3.1.2023'],
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
      ['Päivämäärä voi olla aikaisintaan 1.1.1600'],
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
  test('does not filter new deleted rows', () => {
    const schema = arrayOfAttributeValues;
    const newAndDeleted = {
      ...validTestValue,
      id: -1,
      isNew: true,
      deleted: true,
    };
    const data = [validTestValue, newAndDeleted];

    expect(schema.cast(data)).toEqual([validTestValue, newAndDeleted]);
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

    expect(errors[''] || []).toEqual([
      'Attribuutin avaimet eivät täsmää: key1, key2',
    ]);
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
      'key2[0].id': ['Pakollinen tieto'],
      'key2[0].key': ['Pakollinen tieto'],
      'key2[0].value': ['Pakollinen tieto'],
      'key2[0].startDate': ['Pakollinen tieto'],
      'key2[0].isNew': ['Pakollinen tieto'],
      'key2[0].deleted': ['Pakollinen tieto'],
    });
  });
});
