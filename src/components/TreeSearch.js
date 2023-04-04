import React from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import useContentLanguage from '../hooks/useContentLanguage';
import useTree from '../hooks/useTree';
import useNavigate from '../hooks/useNavigate';

const TreeSearch = () => {
  const { t } = useTranslation();
  const { tree } = useTree();
  const navigate = useNavigate();

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

  const changeSelected = (event, organisationUnit) => {
    if (organisationUnit) {
      navigate({ node: organisationUnit.uniqueId });
    }
  };

  return (
    <Autocomplete
      id="tree-search"
      freeSolo
      options={uniqueOptions}
      getOptionLabel={(option) => option.name || ''}
      renderOption={(props, option) => (
        <li {...props} key={`${option.name}`}>
          {option.name}
        </li>
      )}
      onChange={changeSelected}
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
        <TextField {...params} label={t('type_three_char_to_start_search')} />
      )}
    />
  );
};

export default TreeSearch;
