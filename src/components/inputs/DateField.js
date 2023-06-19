import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { toISODateStringLocal } from '../../utils/dateUtils';

const DateField = ({
  helperText,
  required,
  error,
  size,
  fullWidth,
  onChange,
  variant,
  renderInput,
  ...props
}) => {
  const defaultRenderInput = (textFieldProps) => (
    <TextField
      {...textFieldProps}
      helperText={helperText}
      size={size}
      required={required}
      error={error}
      fullWidth={fullWidth}
      variant={variant}
      sx={{
        '& .MuiInputAdornment-root .MuiButtonBase-root': {
          marginRight: variant === 'standard' ? -1 : -1.5,
        },
      }}
    />
  );

  return (
    <DatePicker
      disableMaskedInput
      onChange={(date, keyboardInputValue) => {
        // Date picker returns Date in user's local time zone
        // Convert value to ISO date string, ensuring it is always formatted
        // in the correct time zone
        onChange && onChange(toISODateStringLocal(date), keyboardInputValue);
      }}
      {...props}
      renderInput={renderInput || defaultRenderInput}
    />
  );
};

export default DateField;
