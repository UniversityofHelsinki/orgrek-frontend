import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useUnitTypeOptions from '../../hooks/useUnitTypeOptions';
import useFormField from '../../hooks/useFormField';
import HelperText from '../inputs/HelperText';

const UnitTypeField = ({ path, onChange }) => {
  const { t } = useTranslation();
  const { unitTypeOptions } = useUnitTypeOptions();
  const { props, errors } = useFormField({ path, name: 'value', onChange });

  return (
    <TextField
      {...props}
      select
      fullWidth
      label={t('value')}
      helperText={<HelperText errors={errors} />}
    >
      {unitTypeOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {t(option.label)}
        </MenuItem>
      ))}
    </TextField>
  );
};

const UnitTypeEditor = ({ keys }) => {
  const { t } = useTranslation();
  const { unitTypeOptions } = useUnitTypeOptions();

  const getDisplayText = (value) =>
    t(unitTypeOptions.find((option) => option.value === value.value)?.label);

  const fields = [
    {
      name: 'value',
      render: (props) => <UnitTypeField {...props} />,
    },
    'startDate',
    'endDate',
  ];

  return (
    <Stack spacing={2}>
      <AttributeEditor
        path="type"
        attributeLabel={t(keys[0])}
        attributeKey={keys[0]}
        getDisplayText={getDisplayText}
        fields={fields}
      />
    </Stack>
  );
};

export default UnitTypeEditor;
