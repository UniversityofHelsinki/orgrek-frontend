import React from 'react';
import { render, screen, waitFor } from '../testUtils';
import { FormContextProvider } from '../../src/contexts/FormContext';
import useForm from '../../src/hooks/useForm';
import { userEvent } from '@storybook/testing-library';

const TestForm = () => {
  const {
    values,
    setValues,
    submit,
    reset,
    dirty,
    invalid,
    valid,
    errors,
    submitting,
  } = useForm();

  return (
    <div>
      <button onClick={() => setValues({ value: 1 })}>Set values</button>
      <button onClick={() => submit()}>Submit</button>
      <button onClick={() => reset()}>Reset</button>
      <p data-testid="values">{JSON.stringify(values)}</p>
      <p data-testid="dirty">{String(dirty)}</p>
      <p data-testid="invalid">{String(invalid)}</p>
      <p data-testid="valid">{String(valid)}</p>
      <p data-testid="submitting">{String(submitting)}</p>
      <p data-testid="errors">{JSON.stringify(errors)}</p>
    </div>
  );
};

const renderTestForm = (props) => {
  const defaultProps = {
    initialValues: {},
    onSubmit: async () => {},
    validate: () => {},
  };

  return render(
    <FormContextProvider {...defaultProps} {...props}>
      <TestForm />
    </FormContextProvider>
  );
};

describe('validate', () => {
  test('initially valid', async () => {
    renderTestForm();
    expect(screen.getByTestId('valid')).toHaveTextContent('true');
    expect(screen.getByTestId('invalid')).toHaveTextContent('false');
  });

  test.each([
    [{}, true],
    [{ error: [] }, true],
    [{ error: ['Form has errors'] }, false],
    [{ error: ['Form has errors', 'more errors'] }, false],
    [{ error: 'Form has errors' }, false],
    [{ error: null }, true],
    [{ error: '' }, true],
    [{ field1: [], field2: [] }, true],
    [{ field1: [], field2: ['error'] }, false],
    [{ field1: [], field2: 'error' }, false],
    [{ field1: [], field2: '' }, true],
  ])('validation result %j valid %s', async (validationResult, valid) => {
    renderTestForm({ validate: () => validationResult });

    await waitFor(async () => {
      await userEvent.click(screen.getByText('Set values'));
    });

    expect(screen.getByTestId('valid')).toHaveTextContent(String(valid));
    expect(screen.getByTestId('invalid')).toHaveTextContent(String(!valid));
  });
});

describe('dirty', () => {
  test('initially false', async () => {
    renderTestForm();
    expect(screen.getByTestId('dirty')).toHaveTextContent('false');
  });

  test('true after modified', async () => {
    renderTestForm();

    await waitFor(async () => {
      await userEvent.click(screen.getByText('Set values'));
    });

    expect(screen.getByTestId('dirty')).toHaveTextContent('true');
  });
});

describe('errors', () => {
  test('initially empty', async () => {
    renderTestForm({ validate: () => ({ error: ['Form has errors'] }) });
    expect(screen.getByTestId('errors')).toHaveTextContent('{}');
  });

  test('returns values from validate', async () => {
    renderTestForm({ validate: () => ({ error: ['Form has errors'] }) });

    await waitFor(async () => {
      await userEvent.click(screen.getByText('Set values'));
    });

    expect(screen.getByTestId('errors')).toHaveTextContent(
      '{"error":["Form has errors"]}'
    );
  });
});

describe('values', () => {
  test('initial values', async () => {
    renderTestForm({ initialValues: { value: 4 } });
    expect(screen.getByTestId('values')).toHaveTextContent('{"value":4}');
  });

  test('modified', async () => {
    renderTestForm({ initialValues: { value: 4 } });

    await waitFor(async () => {
      await userEvent.click(screen.getByText('Set values'));
    });

    expect(screen.getByTestId('values')).toHaveTextContent('{"value":1}');
  });
});
