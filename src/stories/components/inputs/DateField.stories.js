import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { parseISO } from 'date-fns';
import DateField from '../../../components/DateField';

export default {
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: 'A wrapper component for MUI X date picker',
      },
    },
  },
};

export const Basic = {
  args: {
    label: 'Label',
    value: '',
    helperText: '',
    required: false,
    disabled: false,
    error: false,
  },
  render: (args) => {
    const [value, setValue] = useState(
      args.value ? parseISO(args.value) : null
    );

    return (
      <DateField
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    );
  },
};

export const FormProps = {
  ...Basic,
  args: {
    ...Basic.args,
    value: '2023-02-10',
    helperText: 'Assistive text',
    required: true,
  },
};

export const Validation = {
  ...Basic,
  args: {
    ...Basic.args,
    value: '2023-02-10',
    helperText: 'Validation error message',
    required: true,
    error: true,
  },
};