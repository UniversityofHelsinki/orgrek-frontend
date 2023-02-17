import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const Tags = (props) => {
  const dispatch = useDispatch();

  if (props.selectableHierarchies?.length > 0) {
    const selectableHierarchiesList = props.selectableHierarchies
      .filter((item) => item !== 'history')
      .map((v) => ({
        title: v,
      }));

    const changeSelected = (event, value) => {
      console.log(value);
      const newValue = value || props.defaultHierarchy;
      console.log(newValue);
      //dispatch(dropDownSwitchValueCall(new String(newValue)));
    };

    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={selectableHierarchiesList}
          getOptionLabel={(option) => option.title}
          defaultValue={[selectableHierarchiesList[0]]}
          onChange={changeSelected}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
        />
      </Stack>
    );
  }
  return <></>;
};

export const dropDownSwitchValueCall = (data) => {
  return {
    type: 'SWITCH_HIERARCHY',
    payload: data,
  };
};

const mapStateToProps = (state) => ({
  selectableHierarchies: state.tree.selectableHierarchies,
  defaultHierarchy: state.tree.defaultHierarchy,
});

export default connect(mapStateToProps, null)(Tags);
