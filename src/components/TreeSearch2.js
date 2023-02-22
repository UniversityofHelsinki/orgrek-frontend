import React, { useState } from 'react';
import { fetchNode } from '../actions/nodeAction';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@mui/material/Autocomplete';
import { Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const TreeSearch2 = (props) => {
  const { t, i18n } = useTranslation();
  const [singleSelections, setSingleSelections] = useState([]);

  const flatten = (current) =>
    current.reduce((a, c) => [...a, c, ...flatten(c.children)], []);
  const language = i18n.language === 'ia' ? 'fi' : i18n.language;
  const options = props.tree[language]
    ? flatten(props.tree[language].children)
    : [];

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
      id="free-solo-demo"
      freeSolo
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
      renderInput={(params) => <TextField {...params} label="freeSolo" />}
    />
  );
};

const mapStateToProps = (state) => ({
  tree: state.tree.tree,
  selectedDay: state.dr.selectedDay,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchResultSelection: (selectedDay, searchResultId) => {
    dispatch(fetchNode(searchResultId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeSearch2);
