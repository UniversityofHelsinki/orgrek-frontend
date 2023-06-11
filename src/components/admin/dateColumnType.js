import React from 'react';
import { GRID_DATE_COL_DEF, useGridApiContext } from '@mui/x-data-grid';
import DateField from '../inputs/DateField';
import { formatDate } from '../../utils/dateUtils';
import GridInput from './GridInput';

const GridEditDateCell = ({ id, field, value }) => {
  const apiRef = useGridApiContext();

  const handleChange = (newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return (
    <DateField
      value={value}
      autoFocus
      fullWidth
      onChange={handleChange}
      renderInput={({ InputProps, ...other }) => {
        return <GridInput fullWidth {...InputProps} {...other} />;
      }}
    />
  );
};

const GridFilterDateInput = ({ item, applyValue, apiRef }) => {
  const handleFilterChange = (newValue) => {
    applyValue({ ...item, value: newValue });
  };

  return (
    <DateField
      value={item.value || null}
      autoFocus
      label={apiRef.current.getLocaleText('filterPanelInputLabel')}
      variant="standard"
      onChange={handleFilterChange}
    />
  );
};

const buildApplyDateFilterFn = (filterItem, compareFn) => {
  if (!filterItem.value) {
    return null;
  }

  // Make a copy of the date to not reset the hours in the original object
  const filterValueCopy = new Date(filterItem.value);
  filterValueCopy.setHours(0, 0, 0, 0);

  const filterValueMs = filterValueCopy.getTime();

  return ({ value }) => {
    if (!value) {
      return false;
    }

    // Make a copy of the date to not reset the hours in the original object
    const dateCopy = new Date(value);
    dateCopy.setHours(0, 0, 0, 0);

    const cellValueMs = dateCopy.getTime();

    return compareFn(cellValueMs, filterValueMs);
  };
};

const getDateFilterOperators = () => [
  {
    value: 'is',
    getApplyFilterFn: (filterItem) => {
      return buildApplyDateFilterFn(
        filterItem,
        (value1, value2) => value1 === value2
      );
    },
    InputComponent: GridFilterDateInput,
  },
  {
    value: 'not',
    getApplyFilterFn: (filterItem) => {
      return buildApplyDateFilterFn(
        filterItem,
        (value1, value2) => value1 !== value2
      );
    },
    InputComponent: GridFilterDateInput,
  },
  {
    value: 'after',
    getApplyFilterFn: (filterItem) => {
      return buildApplyDateFilterFn(
        filterItem,
        (value1, value2) => value1 > value2
      );
    },
    InputComponent: GridFilterDateInput,
  },
  {
    value: 'onOrAfter',
    getApplyFilterFn: (filterItem) => {
      return buildApplyDateFilterFn(
        filterItem,
        (value1, value2) => value1 >= value2
      );
    },
    InputComponent: GridFilterDateInput,
  },
  {
    value: 'before',
    getApplyFilterFn: (filterItem) => {
      return buildApplyDateFilterFn(
        filterItem,
        (value1, value2) => value1 < value2
      );
    },
    InputComponent: GridFilterDateInput,
  },
  {
    value: 'onOrBefore',
    getApplyFilterFn: (filterItem) => {
      return buildApplyDateFilterFn(
        filterItem,
        (value1, value2) => value1 <= value2
      );
    },
    InputComponent: GridFilterDateInput,
  },
  {
    value: 'isEmpty',
    getApplyFilterFn: () => {
      return ({ value }) => {
        return value === null;
      };
    },
    requiresFilterValue: false,
  },
  {
    value: 'isNotEmpty',
    getApplyFilterFn: () => {
      return ({ value }) => {
        return value !== null;
      };
    },
    requiresFilterValue: false,
  },
];

/**
 * Date column type for MUI X DataGrid
 *
 * @see https://mui.com/x/react-data-grid/recipes-editing/#usage-with-mui-x-date-pickers
 */
const dateColumnType = {
  ...GRID_DATE_COL_DEF,
  resizable: false,
  renderEditCell: (params) => <GridEditDateCell {...params} />,
  filterOperators: getDateFilterOperators(),
  valueFormatter: (params) => {
    if (typeof params.value === 'string') {
      return params.value;
    } else if (params.value) {
      return formatDate(params.value);
    } else {
      return '';
    }
  },
};

export default dateColumnType;
