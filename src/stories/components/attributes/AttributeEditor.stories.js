/* eslint-disable max-lines */
import React from 'react';
import AttributeEditor from '../../../components/attributes/AttributeEditor';
import MenuItem from '@mui/material/MenuItem';
import TextField from '../../../components/inputs/TextField';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { object, array, string, boolean } from 'yup';
import { expect } from '@storybook/jest';
import { Form } from '../../../contexts/FormContext';
import { toDate } from '../../../utils/dateUtils';
import '../../../utils/validations'; // Register custom validators
import { waitForAnimations } from '../../storyUtils';
import ValueField from '../../../components/attributes/ValueField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import HelperText from '../../../components/inputs/HelperText';
import useTextField from '../../../hooks/useTextField';
import useFormField from '../../../hooks/useFormField';

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
  render: ({ data, onChange, ...args }) => {
    return (
      <Form initialValues={{ data }} onChange={onChange}>
        <AttributeEditor {...args} />
      </Form>
    );
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
  render: ({ data, onChange, ...args }) => {
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
      <Form initialValues={{ data }} validate={validate} onChange={onChange}>
        <AttributeEditor {...args} />
      </Form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.clear(canvas.getAllByRole('textbox')[0]);
  },
};

export const ValidationSchema = {
  ...Default,
  render: ({ data, onChange, ...args }) => {
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
      <Form
        initialValues={{ data }}
        validationSchema={validationSchema}
        onChange={onChange}
      >
        <AttributeEditor {...args} />
      </Form>
    );
  },
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

const dropdownFieldOptions = [
  { value: 'value1', label: 'praesent dictum' },
  { value: 'value2', label: 'interdum lectus' },
  { value: 'value3', label: 'pretium metus in pellentesque' },
];

const CustomDropdownField = ({ path, onChange }) => {
  const { props, errors } = useFormField({ path, name: 'value', onChange });

  return (
    <TextField
      {...props}
      select
      fullWidth
      helperText={<HelperText errors={errors} />}
    >
      {dropdownFieldOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
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
  render: ({ data, onChange, ...args }) => {
    const fields = [
      {
        name: 'value',
        render: (props) => <CustomDropdownField {...props} />,
      },
      'startDate',
      'endDate',
    ];

    const getDisplayText = (value) =>
      dropdownFieldOptions.find((option) => option.value === value.value)
        ?.label;

    return (
      <Form initialValues={{ data }} onChange={onChange}>
        <AttributeEditor
          {...args}
          fields={fields}
          getDisplayText={getDisplayText}
        />
      </Form>
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

// Example: How to create a custom field. Compare this to ValueField.
const AdditionalValueField = ({ path }) => {
  const { errors, props } = useTextField({
    path,
    name: 'additionalValue',
  });

  const customProps = {
    ...props,
    label: 'Additional value',
    helperText: <HelperText errors={errors} />,
    fullWidth: true,
  };

  return <TextField {...customProps} />;
};

const CustomCheckboxField = ({ path }) => {
  const { value, setValue } = useFormField({ path, name: 'checked' });

  return (
    <FormControlLabel
      label="Checkbox"
      control={
        <Checkbox
          checked={value}
          onChange={(event) => setValue(event.target.checked)}
        />
      }
      sx={{ mt: { xs: -2, sm: 1 } }}
    />
  );
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
  render: ({ data, onChange, ...args }) => {
    const validationSchema = object({
      data: array().of(
        object({
          value: string().min(3).max(32).required(),
          additionalValue: string().max(11).required(),
          startDate: string().date().required().minDate(toDate('1600-01-01')),
          endDate: string().date().nullable(),
          checked: boolean(),
        })
      ),
    });

    const fields = [
      // Example: How to customize value field
      {
        name: 'value',
        label: 'Custom label',
        helperText: 'Custom helper text',
        gridProps: { xs: 12, sm: 3, md: 4 },
        render: (props) => <ValueField {...props} />,
      },
      // Example: How to add completely new custom field
      {
        name: 'additionalValue',
        gridProps: { xs: 12, sm: 3, md: 3 },
        render: (props) => {
          // See AdditionalValueField component definition above
          return <AdditionalValueField {...props} />;
        },
      },
      // Example: How to customize only grid props of the existing fields
      // This works for all the existing names 'value', 'startStart' and 'endDate'
      {
        name: 'startDate',
        gridProps: { xs: 12, sm: 3, md: 3 },
      },
      // Example: How to add a custom checkbox field
      {
        name: 'checked',
        gridProps: { xs: 12, sm: 3, md: 2 },
        render: (props) => <CustomCheckboxField {...props} />,
      },
      // Example: How to add any arbitrary content
      {
        name: 'additionalText',
        gridProps: { xs: 12 }, // width 12 always puts content on a new line
        render: ({ value }) => {
          // Doing just something with value.id to demonstrate it is possible
          // (id 1002 refers to the second row in the test data of this story)
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
      <Form
        initialValues={{ data }}
        validationSchema={validationSchema}
        onChange={onChange}
      >
        <AttributeEditor {...args} fields={fields} />
      </Form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    expect(canvas.getAllByLabelText(/Custom label/)).toHaveLength(3);
    expect(canvas.getAllByText(/Custom helper text/)).toHaveLength(3);

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
