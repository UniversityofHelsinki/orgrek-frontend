import React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { parseISO } from 'date-fns';

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
      <DatePicker
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => (
          <TextField
            {...props}
            helperText={args.helperText}
            required={args.required}
            error={args.error}
          />
        )}
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
