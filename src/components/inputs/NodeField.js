import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';
import useTree from '../../hooks/useTree';
import useContentLanguage from '../../hooks/useContentLanguage';

/**
 * Autocomplete field for searching and selecting a node from the tree.
 *
 * See MUI Autocomplete for all supported props.
 */
const NodeField = ({ label, placeholder, ...props }) => {
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

  return (
    <Autocomplete
      {...props}
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
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder || t('type_three_char_to_start_search')}
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
   * If true, allows only selecting a value from the suggestions menu,
   * and the field is cleared on blur if nothing was selected.
   *
   * If false, the typed text remains in the field on blur even if it is not
   * a valid selection.
   * */
  freeSolo: PropTypes.bool,

  /**
   * Called when a value is selected or the field is cleared.
   */
  onChange: PropTypes.func.isRequired,
};

export default NodeField;
