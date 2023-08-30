import * as React from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Chip,
  Checkbox,
  createTheme,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import useHierarchies from '../hooks/useHierarchies';
import { useState } from 'react';
import fieldComparator from './admin/fieldComparator';
import { getMUICoreLocale } from '../utils/languageUtils';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const HierarchySelection = (props) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const themeWithLocale = createTheme(theme, getMUICoreLocale(i18n.language));
  const [hierarchies, setHierarchies] = useHierarchies();
  const [menuOpen, setMenuOpen] = useState(false);

  const iterate = (hierarchyList) => {
    let selectedHierarchies = [];
    for (const hierarchy of hierarchyList) {
      selectedHierarchies.push(hierarchy.value ? hierarchy.value : hierarchy);
    }
    return selectedHierarchies.join(',');
  };

  if (props.selectableHierarchies?.length > 0) {
    const selectableHierarchiesList = props.selectableHierarchies
      .map((v) => ({
        value: v,
        label: t(v),
      }))
      .sort((a, b) =>
        t(a.label).toLowerCase() > t(b.label).toLowerCase() ? 1 : -1
      );

    let selectedHierarchies = hierarchies;

    const handleToggleOption = (selectedOptions) =>
      (selectedHierarchies = selectedOptions);

    const allSelected =
      selectedHierarchies.length === selectableHierarchiesList.length;

    const handleClearOptions = () =>
      (selectedHierarchies = props.defaultHierarchy);

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
      setHierarchies(selectedHierarchies.split(','));
    };

    const filter = createFilterOptions();

    const optionRenderer = (props, option, { selected }) => {
      const selectAllProps =
        option.value === 'select-all' // To control the state of 'select-all' checkbox
          ? { checked: allSelected }
          : {};
      return (
        <li {...props} aria-label={option.label}>
          <Checkbox
            color="primary"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={selected}
            {...selectAllProps}
          />
          {option.label}
        </li>
      );
    };

    return (
      <ThemeProvider theme={themeWithLocale}>
        <Autocomplete
          multiple
          size={props.size}
          id="hierarchy-selection"
          disableCloseOnSelect
          openText={t('hierarchySelection.openText')}
          closeText={t('hierarchySelection.closeText')}
          clearText={t('hierarchySelection.clearText')}
          options={selectableHierarchiesList.sort(fieldComparator('label'))}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          getOptionLabel={(option) => option.label}
          value={selectedHierarchies.map((v) => ({ value: v, label: t(v) }))}
          onChange={changeSelected}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            return [
              { value: 'select-all', label: t('select_all_none') },
              ...filtered,
            ];
          }}
          onOpen={() => setMenuOpen(true)}
          onClose={() => setMenuOpen(false)}
          renderOption={optionRenderer}
          renderInput={(params) => (
            <TextField
              id="search"
              {...params}
              label={t('units')}
              placeholder=""
            />
          )}
          renderTags={(tags, getTagProps) => {
            const hiddenCount = Math.max(tags.length - props.limitTags, 0);
            return (
              <div
                style={{
                  display: 'flex',
                  textOverflow: 'ellipsis',
                  flexWrap: menuOpen ? 'wrap' : 'initial',
                  maxWidth: '77%',
                }}
              >
                {tags.map(
                  (option, index) =>
                    (menuOpen || index + 1 <= props.limitTags) && (
                      <Chip
                        title={option.label}
                        size="small"
                        key={option.value}
                        label={option.label}
                        aria-label={option.label}
                        deleteIcon={<CloseIcon />}
                        {...getTagProps({ index })}
                        sx={{
                          minWidth: menuOpen ? 'initial' : '0',
                        }}
                      />
                    )
                )}
                {!menuOpen && hiddenCount > 0 && (
                  <span style={{ marginLeft: '10px', alignSelf: 'center' }}>
                    +{hiddenCount}
                  </span>
                )}
              </div>
            );
          }}
        />
      </ThemeProvider>
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
