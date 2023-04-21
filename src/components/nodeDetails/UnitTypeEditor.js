import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useGetValidHierarchyFiltersQuery } from '../../store';
import { useSelector } from 'react-redux';
import fillSelectableUnits from '../../hooks/filterSelectableUnits';
const selectableUnits = [];

const UnitTypeEditor = ({ keys }) => {
  const { t } = useTranslation();
  const { data } = useGetValidHierarchyFiltersQuery();
  const selectedHierarchies = useSelector(
    (state) => state.tree.selectedHierarchy
  );
  const { values, setValues } = useForm();

  fillSelectableUnits(selectableUnits, data, selectedHierarchies, keys);

  const renderValueField = (valueFieldProps) => (
    <TextField select {...valueFieldProps}>
      {selectableUnits.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {t(option.label)}
        </MenuItem>
      ))}
    </TextField>
  );

  const getDisplayText = (value) =>
    t(selectableUnits.find((option) => option.value === value.value)?.label);

  return (
    <Stack spacing={2}>
      <AttributeEditor
        attributeLabel={t(keys[0])}
        attributeKey={keys[0]}
        valueLabel={t('value')}
        path="type"
        data={values.type}
        renderValueField={renderValueField}
        onChange={(newData) => setValues({ ...values.type, type: newData })}
        getDisplayText={getDisplayText}
      />
    </Stack>
  );
};

export default UnitTypeEditor;
