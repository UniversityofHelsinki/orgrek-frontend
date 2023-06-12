import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import DateField from '../../../components/inputs/DateField';

export default {
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: 'A wrapper component for MUI X date picker',
      },
    },
  },
  argTypes: {
    onChange: { action: true },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
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
    size: 'medium',
  },
  render: ({ onChange, ...args }) => {
    const [value, setValue] = useState(args.value || null);

    return (
      <DateField
        {...args}
        value={value}
        onChange={(date, keyboardInputValue) => {
          setValue(date);
          onChange(date, keyboardInputValue);
        }}
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

export const Small = {
  ...Basic,
  args: {
    ...Basic.args,
    size: 'small',
  },
};
