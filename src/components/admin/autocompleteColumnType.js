import React from 'react';
import { useGridApiContext } from '@mui/x-data-grid';
import Autocomplete from '@mui/material/Autocomplete';
import GridInput from './GridInput';

const GridAutocompleteEditCell = ({ id, field, value, colDef, row }) => {
  const apiRef = useGridApiContext();

  const { valueOptions, getCreateNewLabel, filterOptions } = colDef;

  if (!valueOptions) {
    throw new Error('Value options is required');
  }

  if (typeof getCreateNewLabel !== 'function') {
    throw new Error('Function getCreateNewLabel is required');
  }

  const handleChange = (event, option) => {
    apiRef.current.setEditCellValue({
      id,
      field,
      value: option?.value || null,
    });
  };

  return (
    <Autocomplete
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      filterOptions={(options, params) => {
        const { inputValue } = params;
        const filtered = (
          filterOptions ? filterOptions(options, row) : options
        ).filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue.toLowerCase() === option.label.toLowerCase()
        );
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            value: inputValue,
            label: getCreateNewLabel(inputValue),
          });
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        } else if (option.label) {
          return option.label;
        } else {
          return '';
        }
      }}
      value={value}
      options={valueOptions}
      fullWidth
      renderOption={(props, option) => <li {...props}>{option.label}</li>}
      isOptionEqualToValue={(option, value) => option.value === value}
      onChange={handleChange}
      renderInput={({ InputLabelProps, InputProps, ...other }) => {
        return <GridInput {...InputProps} {...other} />;
      }}
    />
  );
};

/**
 * Autocomplete column type for MUI X DataGrid.
 *
 * Behaves like the standard singleSelect column type but renders an Autocomplete field.
 *
 * @see https://mui.com/x/react-data-grid/column-definition/#custom-column-types
 */
const autocompleteColumnType = {
  renderEditCell: (params) => <GridAutocompleteEditCell {...params} />,
};

export default autocompleteColumnType;
