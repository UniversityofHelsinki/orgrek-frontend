import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useUnitTypeOptions from '../../hooks/useUnitTypeOptions';

const UnitTypeEditor = ({ keys }) => {
  const { t } = useTranslation();
  const { unitTypeOptions } = useUnitTypeOptions();
  const { values, setValues } = useForm();

  const renderValueField = (valueFieldProps) => (
    <TextField select {...valueFieldProps}>
      {unitTypeOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {t(option.label)}
        </MenuItem>
      ))}
    </TextField>
  );

  const getDisplayText = (value) =>
    t(unitTypeOptions.find((option) => option.value === value.value)?.label);

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
