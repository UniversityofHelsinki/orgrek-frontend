import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TextField from '@mui/material/TextField';
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@mui/material';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const HierarchySelection = (props) => {
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
      }))
      .sort((a, b) =>
        t(a.label).toLowerCase() > t(b.label).toLowerCase() ? 1 : -1
      );

    let selectedHierarchies = [props.defaultHierarchy];
    if (props.selectedHierarchy) {
      selectedHierarchies = [...props.selectedHierarchy.split(',')];
    }

    const changeSelected = (event, hierarchies) => {
      const hierarchyList = hierarchies || props.defaultHierarchy;
      let selectedHierarchies;
      if (hierarchies && hierarchies.length > 0) {
        selectedHierarchies = iterate(hierarchyList);
      } else {
        selectedHierarchies = props.defaultHierarchy;
      }
      dispatch(dropDownSwitchValueCall(selectedHierarchies));
    };

    return (
      <Autocomplete
        multiple
        id="hierarchy-selection"
        disableCloseOnSelect
        options={selectableHierarchiesList}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.label}
        value={selectedHierarchies.map((v) => ({ value: v, label: t(v) }))}
        onChange={changeSelected}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            id="search"
            {...params}
            label={t('units')}
            placeholder=""
          />
        )}
      />
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
  selectedHierarchy: state.tree.selectedHierarchy,
  selectableHierarchies: state.tree.selectableHierarchies,
  defaultHierarchy: state.tree.defaultHierarchy,
});

export default connect(mapStateToProps)(HierarchySelection);
