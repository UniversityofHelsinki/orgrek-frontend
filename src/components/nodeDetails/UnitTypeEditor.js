import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useFormField from '../../hooks/useFormField';
import HelperText from '../inputs/HelperText';
import useForm from '../../hooks/useForm';

const UnitTypeField = ({ path, value: attribute }) => {
  const { t } = useTranslation();
  const { props, errors } = useFormField({ path, name: 'value' });

  const meta = attribute.meta;
  const acceptedValues = meta.acceptedValues;

  return (
    <TextField
      {...props}
      select
      fullWidth
      label={t('value')}
      helperText={<HelperText errors={errors} />}
    >
      {acceptedValues.map((option) => (
        <MenuItem key={option} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

const UnitTypeEditor = ({ metas }) => {
  const { t } = useTranslation();

  const { values } = useForm();

  const getDisplayText = (attribute) => t(attribute.value);

  const fields = [
    {
      name: 'value',
      render: (props) => <UnitTypeField {...props} />,
    },
    'startDate',
    'endDate',
  ];

  const createRow = (key) => {
    return () => ({
      key,
      id: Math.floor(Math.random() * -1000000),
      meta: metas[key],
      value: null,
      startDate: null,
      endDate: null,
      isNew: true,
      deleted: false,
    });
  };

  return (
    <Stack spacing={2}>
      {Object.entries(values).map(([key, attributes], i) => (
        <AttributeEditor
          key={`${key}-${i}`}
          path="type"
          attributeLabel={t(key)}
          attributeKey={key}
          getDisplayText={getDisplayText}
          fields={fields}
          customCreateRow={createRow(key)}
        />
      ))}
    </Stack>
  );
};

export default UnitTypeEditor;
