/* eslint-disable max-lines */
import React, { useState } from 'react';
import AttributeEditor from '../../../components/attributes/AttributeEditor';
import MenuItem from '@mui/material/MenuItem';
import TextField from '../../../components/inputs/TextField';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { object, array, string } from 'yup';
import { expect } from '@storybook/jest';
import { FormContextProvider } from '../../../contexts/FormContext';
import useForm from '../../../hooks/useForm';
import { toDate } from '../../../utils/dateUtils';
import '../../../utils/validations'; // Register custom validators
import { waitForAnimations } from '../../storyUtils';
import ValueField from '../../../components/attributes/ValueField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getErrors, getMax, isRequired } from '../../../utils/validationUtils';
import HelperText from '../../../components/inputs/HelperText';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

export default {
  component: AttributeEditor,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: true },
  },
  parameters: {
    systemTime: now,
  },
};

export const Default = {
  args: {
    attributeKey: 'data',
    attributeLabel: 'Attribuutti',
    overlap: false,
    path: 'data',
    data: [
      {
        id: 1001,
        value: 'value3',
        startDate: '2023-01-01',
        endDate: null,
        isNew: false,
        deleted: false,
      },
      {
        id: 1002,
        value: 'value2',
        startDate: '2022-01-01',
        endDate: '2022-12-31',
        isNew: false,
        deleted: false,
      },
      {
        id: 1003,
        value: 'value1',
        startDate: null,
        endDate: '2021-12-31',
        isNew: false,
        deleted: false,
      },
    ],
  },
  render: (args) => {
    const [data, setData] = useState(args.data);
    const { setValues } = useForm();

    const handleChange = (newData) => {
      setData(newData);
      setValues && setValues({ data: newData });
      args.onChange && args.onChange(newData);
    };

    return <AttributeEditor {...args} data={data} onChange={handleChange} />;
  },
};

export const Empty = {
  ...Default,
  args: {
    ...Default.args,
    data: [],
  },
  play: async () => {
    // Empty row appears with an animation, so wait for it before running
    // a11y tests
    await waitForAnimations();
  },
};

export const ActionMenuOpen = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getAllByTestId('attributeRowMenuButton')[0]);
  },
};

export const InsertBefore = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    await userEvent.click(canvas.getAllByTestId('attributeRowMenuButton')[0]);

    await waitFor(async () => {
      await userEvent.click(canvas.getByText('Lisää rivi yläpuolelle'));
    });

    // The existing row should be updated as ending today
    await waitFor(() => {
      expect(canvas.getAllByLabelText('Voimassaolo päättyy')[1]).toHaveValue(
        '22.3.2023'
      );
    });

    // The new row should have start date tomorrow
    await expect(canvas.getAllByLabelText('Voimassaolo alkaa')[0]).toHaveValue(
      '23.3.2023'
    );

    // Wait for animations before a11y tests
    await new Promise((resolve) => setTimeout(resolve, 200));
  },
};

export const Overlapping = {
  ...Default,
  args: {
    ...Default.args,
    overlap: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    await userEvent.click(canvas.getAllByTestId('attributeRowMenuButton')[0]);

    await waitFor(async () => {
      await userEvent.click(canvas.getByText('Lisää rivi yläpuolelle'));
    });

    // The existing row should not be changed
    await waitFor(() => {
      expect(canvas.getAllByLabelText('Voimassaolo päättyy')[1]).toHaveValue(
        ''
      );
    });

    // The new row should have empty start date
    await expect(canvas.getAllByLabelText('Voimassaolo alkaa')[0]).toHaveValue(
      ''
    );

    // Wait for animations before a11y tests
    await new Promise((resolve) => setTimeout(resolve, 200));
  },
};

export const ValidationErrors = {
  ...Default,
  decorators: [
    (Story) => {
      const validate = (values) => {
        const errors = {};

        // Simple example to test path including index
        values.data.forEach((item, index) => {
          const value = item.value || '';

          if (value.length < 3) {
            errors[`data[${index}].value`] = ['Minimipituus 3 merkkiä'];
          }
        });

        // Some hard-coded errors just for an example
        errors['data[0].startDate'] = [
          'Päivä voi olla aikaisintaan 3.1.2023',
          'Päivämäärä vinksin vonksin tai ainakin heikun keikun',
        ];
        errors['data[1].endDate'] = ['Valitse jokin muu päivä'];

        return errors;
      };

      return (
        <FormContextProvider validate={validate} onSubmit={async () => {}}>
          <Story />
        </FormContextProvider>
      );
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.clear(canvas.getAllByRole('textbox')[0]);
  },
};

export const ValidationSchema = {
  ...Default,
  decorators: [
    (Story) => {
      const validationSchema = object({
        data: array().of(
          object({
            value: string().min(3).max(32).required(),
            startDate: string().date().required().minDate(toDate('1600-01-01')),
            endDate: string().date().nullable(),
          })
        ),
      });

      return (
        <FormContextProvider
          validationSchema={validationSchema}
          onSubmit={async () => {}}
        >
          <Story />
        </FormContextProvider>
      );
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.clear(canvas.getAllByRole('textbox')[0]);
    await userEvent.type(canvas.getAllByRole('textbox')[0], 'v');

    await userEvent.clear(canvas.getAllByRole('textbox')[1]);
    await userEvent.type(canvas.getAllByRole('textbox')[1], '1.1.1599');
  },
};

export const DeletedRow = {
  ...Default,
  args: {
    ...Default.args,
    data: [
      {
        id: 1001,
        value: 'value3',
        startDate: '2023-01-01',
        endDate: null,
        isNew: false,
        deleted: false,
      },
      {
        id: 1002,
        value: 'value2',
        startDate: '2022-01-01',
        endDate: '2022-12-31',
        isNew: false,
        deleted: true,
      },
      {
        id: 1003,
        value: 'value1',
        startDate: null,
        endDate: '2021-12-31',
        isNew: false,
        deleted: false,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    expect(
      canvas.getByText('Poistettu: value2, voimassa 1.1.2022 - 31.12.2022')
    ).toBeInTheDocument();
  },
};

export const DropdownEditor = {
  ...Default,
  parameters: {
    docs: {
      description: {
        story: 'An example how to use a dropdown field for editing values',
      },
    },
  },
  render: (args) => {
    const [data, setData] = useState(args.data);

    const handleChange = (newData) => {
      setData(newData);
      args.onChange && args.onChange(newData);
    };

    const options = [
      { value: 'value1', label: 'praesent dictum' },
      { value: 'value2', label: 'interdum lectus' },
      { value: 'value3', label: 'pretium metus in pellentesque' },
    ];

    const renderValueField = (valueFieldProps) => (
      <TextField select {...valueFieldProps}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );

    const getDisplayText = (value) =>
      options.find((option) => option.value === value.value)?.label;

    return (
      <AttributeEditor
        {...args}
        data={data}
        onChange={handleChange}
        renderValueField={renderValueField}
        getDisplayText={getDisplayText}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    await userEvent.click(canvas.getByText('praesent dictum'));

    await waitFor(() => {
      expect(canvas.getByRole('listbox')).toBeVisible();
    });
  },
};

export const DeletedRowDisplayText = {
  ...DropdownEditor,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    await userEvent.click(canvas.getAllByTestId('attributeRowMenuButton')[1]);

    await waitFor(async () => {
      await userEvent.click(canvas.getByText('Poista rivi'));
    });

    await waitFor(() => {
      expect(
        canvas.getByText(
          'Poistettu: interdum lectus, voimassa 1.1.2022 - 31.12.2022'
        )
      ).toBeInTheDocument();
    });
  },
};

export const CustomFields = {
  ...Default,
  args: {
    ...Default.args,
    attributeLabel: 'Attribute with custom fields',
    data: [
      {
        id: 1001,
        value: 'value3',
        additionalValue: 'ipsum',
        startDate: '2023-01-01',
        checked: false,
        isNew: false,
        deleted: false,
      },
      {
        id: 1002,
        value: 'value2',
        additionalValue: '',
        startDate: '2022-01-01',
        checked: true,
        isNew: false,
        deleted: false,
      },
      {
        id: 1003,
        value: 'value1',
        additionalValue: '',
        startDate: null,
        checked: false,
        isNew: false,
        deleted: false,
      },
    ],
  },
  decorators: [
    (Story) => {
      const validationSchema = object({
        data: array().of(
          object({
            value: string().min(3).max(32).required(),
            additionalValue: string().max(11).required(),
            startDate: string().date().required().minDate(toDate('1600-01-01')),
            endDate: string().date().nullable(),
          })
        ),
      });

      return (
        <FormContextProvider
          validationSchema={validationSchema}
          onSubmit={async () => {}}
        >
          <Story />
        </FormContextProvider>
      );
    },
  ],
  render: (args) => {
    const [data, setData] = useState(args.data);
    const { setValues, errors, validationSchema } = useForm();

    const handleChange = (newData) => {
      setData(newData);
      setValues && setValues({ data: newData });
      args.onChange && args.onChange(newData);
    };

    const fields3 = [
      {
        name: 'value',
        label: 'Custom label',
        gridProps: { xs: 12, sm: 3, md: 4 },
        render: (props) => <ValueField {...props} />,
      },
      {
        name: 'additionalValue',
        gridProps: { xs: 12, sm: 3, md: 3 },
        render: ({ path, value, onChange }) => {
          const fieldPath = `${path}.additionalValue`;
          const additionalValueErrors = getErrors(errors, fieldPath);

          return (
            <TextField
              fullWidth
              required={isRequired(validationSchema, fieldPath)}
              label="Additional value"
              value={value.additionalValue || ''}
              error={additionalValueErrors.length > 0}
              helperText={<HelperText errors={additionalValueErrors} />}
              inputProps={{ maxLength: getMax(validationSchema, fieldPath) }}
              onChange={(event) =>
                onChange({
                  ...value,
                  additionalValue: event.target.value,
                })
              }
            />
          );
        },
      },
      {
        name: 'startDate',
        gridProps: { xs: 12, sm: 3, md: 3 },
      },
      {
        name: 'checked',
        gridProps: { xs: 12, sm: 3, md: 2 },
        render: ({ value, onChange }) => (
          <FormControlLabel
            label="Checkbox"
            control={
              <Checkbox
                checked={value.checked}
                onChange={(event) =>
                  onChange({
                    ...value,
                    checked: event.target.checked,
                  })
                }
              />
            }
            sx={{ mt: { xs: -2, sm: 1 } }}
          />
        ),
      },
      {
        name: 'additionalText',
        gridProps: { xs: 12 },
        render: ({ value }) => {
          return (
            value.id === 1002 && (
              <p>
                Additional content below <code>{value.value}</code>. Nunc
                ultrices risus eget felis venenatis facilisis. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos.
              </p>
            )
          );
        },
      },
    ];

    return (
      <AttributeEditor
        {...args}
        fields={fields3}
        data={data}
        onChange={handleChange}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    expect(canvas.getAllByLabelText(/Custom label/)).toHaveLength(3);

    // Initial value
    expect(canvas.getAllByLabelText(/Additional value/)[0]).toHaveValue(
      'ipsum'
    );

    // Initially empty
    expect(canvas.getAllByLabelText(/Additional value/)[1]).toHaveValue('');
    await userEvent.type(
      canvas.getAllByLabelText(/Additional value/)[1],
      'hipsun ipsum',
      { delay: 100 }
    );
    // Max length 11
    expect(canvas.getAllByLabelText(/Additional value/)[1]).toHaveValue(
      'hipsun ipsu'
    );

    // Initially unchecked
    expect(canvas.getAllByLabelText('Checkbox')[0]).not.toBeChecked();
    await userEvent.click(canvas.getAllByLabelText('Checkbox')[0]);
    expect(canvas.getAllByLabelText('Checkbox')[0]).toBeChecked();

    // Initially checked
    expect(canvas.getAllByLabelText('Checkbox')[1]).toBeChecked();
    expect(canvas.getByText(/Additional content below/)).toBeVisible();

    expect(
      canvas.getAllByLabelText(/Additional value/)[2]
    ).toHaveAccessibleDescription('Pakollinen tieto');
    expect(
      canvas.getAllByLabelText(/Voimassaolo alkaa/)[2]
    ).toHaveAccessibleDescription('Pakollinen tieto');
  },
};
