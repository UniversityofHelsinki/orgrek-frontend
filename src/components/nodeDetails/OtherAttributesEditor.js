import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useFormField from '../../hooks/useFormField';
import HelperText from '../inputs/HelperText';

const OtherAttributeValueField = ({ path, value: attribute }) => {
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

const OtherAttributesEditor = ({ metas }) => {
  const { t } = useTranslation();
  const { values } = useForm();

  const createRow = (key) => {
    return () => ({
      key,
      meta: metas[key],
      id: -Math.floor(Math.random() * 100000),
      value: '',
      startDate: null,
      endDate: null,
      isNew: true,
      deleted: false,
    });
  };

  const fields = [
    {
      name: 'value',
      render: (props) => <OtherAttributeValueField {...props} />,
    },
    'startDate',
    'endDate',
  ];

  return (
    <Stack spacing={2}>
      {Object.entries(values).map(([key, attributes], i) => (
        <AttributeEditor
          key={`${key}-${i}`}
          attributeLabel={t(key)}
          attributeKey={`${key}`}
          path={key}
          fields={fields}
          customCreateRow={createRow(key)}
        />
      ))}
    </Stack>
  );
};

export default OtherAttributesEditor;
