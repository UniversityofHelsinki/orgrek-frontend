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

  const nameMatches = (name, text) => {
    console.log(name.toLowerCase());
    console.log(text.toLowerCase());
    console.log('matches : ' + name.toLowerCase().includes(text.toLowerCase()));
    return name.toLowerCase().includes(text.toLowerCase());
  };

  const uniqueIdMatches = (uniqueId, text) => {
    return uniqueId.toString() === text.toLowerCase();
  };

  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      options={options}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <li {...props} key={option.uniqueId}>
          {option.name}
        </li>
      )}
      filterOptions={(options, state) => {
        if (state.inputValue.length > 2) {
          return options.filter((option) =>
            nameMatches(option.name, state.inputValue)
          );
        }
        console.log(options);
        return options;
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
