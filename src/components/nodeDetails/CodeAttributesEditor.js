import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import { Typography, Box } from '@mui/material';

const attributeEntryComparator = (keys) => (a, b) => {
  const aIdx = keys.indexOf(a[0]);
  const bIdx = keys.indexOf(b[0]);
  return bIdx - aIdx;
};

const ReadOnlyCodeBox = ({ label, value }) => {
  return (
    <Box mb={1}>
      <Typography component="p" variant="h6" mb={2}>
        {label}
      </Typography>
      <Typography variant="body1" ml={1.5}>
        {value}
      </Typography>
    </Box>
  );
};

const CodeAttributesEditor = ({ readOnlyFields, keys = [] }) => {
  const { t } = useTranslation();
  const { values } = useForm();

  const fields = [
    { name: 'value', label: t('attribute_value') },
    'startDate',
    'endDate',
  ];

  return (
    <Stack spacing={2}>
      {[
        ...Object.entries(readOnlyFields)
          .sort(attributeEntryComparator)
          .map(([key, attributes], i) => (
            <ReadOnlyCodeBox
              key={`${key}-${i}`}
              label={t(key)}
              value={attributes[0].value}
            />
          )),
        ...keys.map((key, i) => (
          <AttributeEditor
            key={`${key}-${i}`}
            attributeLabel={t(key)}
            attributeKey={`${key}`}
            fields={fields}
            path={key}
          />
        )),
      ]}
    </Stack>
  );
};

export default CodeAttributesEditor;
