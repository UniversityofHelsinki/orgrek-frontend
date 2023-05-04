import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';
import useTree from '../../hooks/useTree';
import useContentLanguage from '../../hooks/useContentLanguage';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '../icons/Search';

/**
 * Autocomplete field for searching and selecting a node from the tree.
 *
 * See MUI Autocomplete for all supported props.
 */
const NodeField = ({
  label,
  placeholder,
  helperText,
  variant,
  disabled,
  error,
  required,
  ...props
}) => {
  const { t } = useTranslation();
  const { tree } = useTree();

  const flatten = (current) =>
    current.reduce((a, c) => [...a, c, ...flatten(c.children)], []);
  const language = useContentLanguage();
  const options =
    tree && tree[language] ? flatten(tree[language].children) : [];

  let uniqueOptions = [
    ...new Map(options.map((item) => [item['uniqueId'], item])).values(),
  ];

  const nameMatches = (name, text) => {
    return name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
  };
  const uniqueIdMatches = (uniqueId, text) => {
    return uniqueId.toString() === text.toLowerCase();
  };

  let inputAdornment;
  if (variant === 'search') {
    inputAdornment = (
      <InputAdornment position="end">
        <SearchIcon color={disabled ? 'disabled' : 'primary'} />
      </InputAdornment>
    );
  }

  return (
    <Autocomplete
      clearText={t('nodeField.clearText')}
      openText={t('nodeField.openText')}
      closeText={t('nodeField.closeText')}
      noOptionsText={t('nodeField.noOptionsText')}
      {...props}
      disabled={disabled}
      freeSolo={variant === 'search'}
      options={uniqueOptions}
      getOptionLabel={(option) => option.name || ''}
      renderOption={(props, option) => (
        <li {...props} key={`${option.name}`}>
          {option.name}
        </li>
      )}
      filterOptions={(options, state) => {
        if (state.inputValue.length > 2) {
          return options.filter(
            (option) =>
              nameMatches(option.name, state.inputValue) ||
              uniqueIdMatches(option.uniqueId, state.inputValue)
          );
        }
        return [];
      }}
      renderInput={({ InputProps, ...params }) => (
        <TextField
          InputProps={{
            ...InputProps,
            endAdornment: InputProps.endAdornment || inputAdornment,
          }}
          label={label}
          placeholder={placeholder || t('type_three_char_to_start_search')}
          helperText={helperText}
          required={required}
          error={error}
          {...params}
        />
      )}
    />
  );
};

NodeField.propTypes = {
  /** Field label */
  label: PropTypes.string,

  /** Hint text displayed in the input before the user enters a value. */
  placeholder: PropTypes.string,

  /**
   * Variant 'combobox' allows only selecting a value from the suggestion menu,
   * and the field is cleared on blur if nothing was selected.
   *
   * Variant 'search' keeps the typed text in the field on blur even if it is
   * not a valid selection.
   * In addition, displays a search icon as input adornment.
   */
  variant: PropTypes.oneOf(['combobox', 'search']),

  /**
   * Called when a value is selected or the field is cleared.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Helper text displayed below the field.
   *
   * HelperText component can be used with this prop to display errors.
   */
  helperText: PropTypes.string,

  /** If true, the component is disabled. */
  disabled: PropTypes.bool,

  /** If true, the field is displayed in an error state. */
  error: PropTypes.bool,

  /** If true, the label is displayed as required and the input value is required. */
  required: PropTypes.bool,
};

export default NodeField;
