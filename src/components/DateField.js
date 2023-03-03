import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

const DateField = ({ helperText, required, error, fullWidth, ...props }) => (
  <DatePicker
    disableMaskedInput
    {...props}
    renderInput={(textFieldProps) => (
      <TextField
        {...textFieldProps}
        helperText={helperText}
        required={required}
        error={error}
        fullWidth={fullWidth}
      />
    )}
  />
);

export default DateField;
