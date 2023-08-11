import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fiFI, svSE, enUS } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { getDateFnsLocale, toISODateStringLocal } from '../../utils/dateUtils';
import { useTranslation } from 'react-i18next';

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
      placeholder={'testing'}
      sx={{
        '& .MuiInputAdornment-root .MuiButtonBase-root': {
          marginRight: variant === 'standard' ? -1 : -1.5,
        },
      }}
    />
  );

  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const localeTextOverrides = {
    todayButtonLabel: t('return_to_today'),
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={getDateFnsLocale(i18n.language)}
      localeText={
        {
          fi: {
            ...fiFI.components.MuiLocalizationProvider.defaultProps.localeText,
            ...localeTextOverrides,
          },
          sv: {
            ...svSE.components.MuiLocalizationProvider.defaultProps.localeText,
            ...localeTextOverrides,
          },
          en: {
            ...enUS.components.MuiLocalizationProvider.defaultProps.localeText,
            ...localeTextOverrides,
          },
          ia: {
            ...localeTextOverrides,
          },
        }[language]
      }
    >
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
    </LocalizationProvider>
  );
};

export default DateField;
