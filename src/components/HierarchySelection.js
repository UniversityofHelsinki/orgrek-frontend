import * as React from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
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
      selectedHierarchies.push(hierarchy.value ? hierarchy.value : hierarchy);
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

    const handleToggleOption = (selectedOptions) =>
      (selectedHierarchies = selectedOptions);

    const allSelected =
      selectedHierarchies.length === props.selectableHierarchies.length - 1;

    const handleClearOptions = () =>
      props.selectedHierarchy(props.defaultHierarchy);

    const handleSelectAll = (isSelected) => {
      if (isSelected) {
        selectedHierarchies = iterate(selectableHierarchiesList);
      } else {
        handleClearOptions();
      }
    };

    const handleToggleSelectAll = () => {
      handleSelectAll && handleSelectAll(!allSelected);
    };

    const changeSelected = (event, hierarchies, reason) => {
      if (hierarchies.find((option) => option.value === 'select-all')) {
        handleToggleSelectAll();
      } else if (hierarchies.find((option) => option.value !== 'select-all')) {
        handleToggleOption && handleToggleOption(hierarchies);
        selectedHierarchies = iterate(selectedHierarchies);
      } else {
        selectedHierarchies = props.defaultHierarchy;
      }
      dispatch(dropDownSwitchValueCall(selectedHierarchies));
    };

    const filter = createFilterOptions();

    const optionRenderer = (props, option, { selected }) => {
      const selectAllProps =
        option.value === 'select-all' // To control the state of 'select-all' checkbox
          ? { checked: allSelected }
          : {};
      return (
        <>
          <li {...props}>
            <Checkbox
              color="primary"
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
              {...selectAllProps}
            />
            {option.label}
          </li>
        </>
      );
    };

    return (
      <Autocomplete
        multiple
        size={props.size}
        limitTags={props.limitTags}
        id="hierarchy-selection"
        disableCloseOnSelect
        options={selectableHierarchiesList}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.label}
        value={selectedHierarchies.map((v) => ({ value: v, label: t(v) }))}
        onChange={changeSelected}
        ChipProps={{ deleteIcon: <CloseIcon /> }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          return [{ value: 'select-all', label: 'kaikki' }, ...filtered];
        }}
        renderOption={optionRenderer}
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
