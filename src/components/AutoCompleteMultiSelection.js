import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Tags = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const iterate = (hierarchyList) => {
    let selectedHierarchies = [];
    for (const hierarchy of hierarchyList) {
      selectedHierarchies.push(hierarchy.value);
    }
    return selectedHierarchies.join(',');
  };

  if (props.selectableHierarchies?.length > 0) {
    const selectableHierarchiesList = props.selectableHierarchies
      .filter((item) => item !== 'history')
      .map((v) => ({
        value: v,
        label: t(v),
      }));

    const changeSelected = (event, hierarchies) => {
      const hierarchyList = hierarchies || props.defaultHierarchy;
      let selectedHierarchies;
      if (hierarchies && hierarchies.length > 0) {
        selectedHierarchies = iterate(hierarchyList);
      } else {
        selectedHierarchies = props.defaultHierarchy;
      }
      dispatch(dropDownSwitchValueCall(new String(selectedHierarchies)));
    };

    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={selectableHierarchiesList}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          getOptionLabel={(option) => option.label}
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
