import React from 'react';
import TextField from '../../../components/TextField';
import { useState } from 'react';

export default {
  component: TextField,
};

export const Basic = {
  args: {
    label: 'Label',
    value: '',
    helperText: '',
    required: false,
    disabled: false,
    error: false,
    inputProps: {
      maxLength: 30,
    },
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <TextField
        {...args}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const FormProps = {
  ...Basic,
  args: {
    ...Basic.args,
    value: 'Text field',
    helperText: 'Assistive text',
    required: true,
    inputProps: {
      maxLength: 30,
    },
  },
};

export const Validation = {
  ...Basic,
  args: {
    ...Basic.args,
    value: 'Text field',
    helperText: 'Validation error message',
    required: true,
    error: true,
  },
};
