import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const UnitTypeEditor = () => {
  const { t } = useTranslation();
  const { values, setValues } = useForm();

  const options = [
    { value: 'value1', label: 'praesent dictum' },
    { value: 'value2', label: 'interdum lectus' },
    { value: 'value3', label: 'pretium metus in pellentesque' },
  ];

  const renderValueField = (valueFieldProps) => (
    <TextField select {...valueFieldProps}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );

  return (
    <Stack spacing={2}>
      <AttributeEditor
        attributeLabel={t('name_fi')}
        valueLabel={t('name')}
        data={values}
        renderValueField={renderValueField}
        onChange={(newData) => setValues({ ...values, newData })}
      />
    </Stack>
  );
};

export default UnitTypeEditor;
