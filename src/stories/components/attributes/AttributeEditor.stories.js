import React, { useState } from 'react';
import AttributeEditor from '../../../components/attributes/AttributeEditor';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { object, array, string } from 'yup';
import { expect } from '@storybook/jest';
import { FormContextProvider } from '../../../contexts/FormContext';
import useForm from '../../../hooks/useForm';
import { toDate } from '../../../utils/dateUtils';
import '../../../utils/validations';
import { waitForAnimations } from '../../storyUtils'; // Register custom validators

export default {
  component: AttributeEditor,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: true },
  },
};

export const Default = {
  args: {
    attributeKey: 'data',
    attributeLabel: 'Attribuutti',
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

export const ValueRequired = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.clear(canvas.getAllByRole('textbox')[0]);
  },
};

export const InvalidDate = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.clear(canvas.getAllByRole('textbox')[1]);
    await userEvent.type(canvas.getAllByRole('textbox')[1], '1.1.');
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
};

export const DeletedRowDisplayText = {
  ...DropdownEditor,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    await userEvent.click(canvas.getAllByTestId('attributeRowMenuButton')[1]);

    await waitFor(async () => {
      await userEvent.click(canvas.getByTestId('deleteRowMenuItem'));
    });

    await waitFor(() => {
      expect(canvas.getByTestId('deletedAttributeRow')).toBeInTheDocument();
    });
  },
};
