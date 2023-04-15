import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { toISODateStringLocal } from '../../utils/dateUtils';

const DateField = ({
  helperText,
  required,
  error,
  fullWidth,
  onChange,
  ...props
}) => (
  <DatePicker
    disableMaskedInput
    onChange={(date, keyboardInputValue) => {
      // Date picker returns Date in user's local time zone
      // Pass ISO date string as the third arg, ensuring it is always formatted
      // in the correct time zone
      onChange &&
        onChange(date, keyboardInputValue, toISODateStringLocal(date));
    }}
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
