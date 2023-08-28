import {
  fiFI as muiFiFI,
  enUS as muiEnUS,
  svSE as muiSvSE,
} from '@mui/material/locale';
import {
  fiFI as dataGridFiFI,
  svSE as dataGridSvSE,
  enUS as dataGridEnUS,
} from '@mui/x-data-grid';
import {
  fiFI as datePickerFiFI,
  svSE as datePickerSvSE,
  enUS as datePickerEnUS,
} from '@mui/x-date-pickers/locales';

// Returns DataGrid locale for the given language.
export const getDataGridLocale = (language) => {
  switch (language) {
    case 'fi':
      return dataGridFiFI;
    case 'sv':
      return dataGridSvSE;
    default:
      return dataGridEnUS;
  }
};

// Returns DatePicker locale for the given language.
export const getDatePickerLocale = (language) => {
  switch (language) {
    case 'fi':
      return datePickerFiFI;
    case 'sv':
      return datePickerSvSE;
    default:
      return datePickerEnUS;
  }
};

// Returns MUI Core locale for the given language.
export const getMUICoreLocale = (language) => {
  switch (language) {
    case 'fi':
      return muiFiFI;
    case 'sv':
      return muiSvSE;
    default:
      return muiEnUS;
  }
};
