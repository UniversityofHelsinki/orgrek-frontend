import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';
import useTree from '../../hooks/useTree';
import useContentLanguage from '../../hooks/useContentLanguage';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '../icons/Search';

const flatten = (current) =>
  current.reduce((a, c) => [...a, c, ...flatten(c.children)], []);

const nameMatches = (name, text) => {
  return name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
};

const uniqueIdMatches = (uniqueId, text) => {
  return uniqueId.toString() === text.toLowerCase();
};

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
  value,
  onChange,
  clearOnSelect = false,
  filter = () => true,
  ...props
}) => {
  const { t } = useTranslation();
  const { trees } = useTree();
  const language = useContentLanguage();
  const languageField = language === 'ia' ? 'fi' : language;
  const options = trees
    ? trees.map((tree) => (tree ? flatten([tree]) : [])).flat()
    : [];
  const [inputValue, setInputValue] = useState('');

  const uniqueOptions = [
    ...new Map(options.map((item) => [item['uniqueId'], item])).values(),
  ];

  const filtered = uniqueOptions.filter(filter);

  const handleChange = (event, newValue, reason) => {
    onChange(
      event,
      newValue === null
        ? null
        : { id: newValue.uniqueId, name: newValue.names[languageField] },
      reason
    );
    if (clearOnSelect) {
      setTimeout(() => setInputValue(''));
    }
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
      freeSolo
      forcePopupIcon={true}
      onChange={handleChange}
      value={value}
      isOptionEqualToValue={(option, value) => {
        return option.uniqueId === value.id;
      }}
      options={filtered}
      inputValue={inputValue}
      onInputChange={(event, value) => setInputValue(value)}
      getOptionLabel={(option) => (option && option.names[languageField]) || ''}
      renderOption={(props, option) => (
        <li {...props} key={`${option.names[languageField]}`}>
          {option.names[languageField]}
        </li>
      )}
      filterOptions={(options, state) => {
        if (state.inputValue.length > 2) {
          return options.filter(
            (option) =>
              nameMatches(option.names[languageField], state.inputValue) ||
              uniqueIdMatches(option.uniqueId, state.inputValue)
          );
        }
        return [];
      }}
      renderInput={({ InputProps, ...params }) => (
        <form role="search" onSubmit={(event) => event.preventDefault()}>
          <TextField
            InputProps={{
              ...InputProps,
              endAdornment: InputProps.endAdornment || inputAdornment,
            }}
            label={t('search_by_name_or_code')}
            placeholder={placeholder || t('type_three_char_to_start_search')}
            helperText={helperText}
            required={required}
            error={error}
            {...params}
          />
        </form>
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
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /** If true, the component is disabled. */
  disabled: PropTypes.bool,

  /** If true, the field is displayed in an error state. */
  error: PropTypes.bool,

  /** If true, the label is displayed as required and the input value is required. */
  required: PropTypes.bool,

  /** Field value as object containing node unique id and name */
  value: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  /** Function for filtering the results as in [].filter(fn) */
  filter: PropTypes.func,
};

export default NodeField;
