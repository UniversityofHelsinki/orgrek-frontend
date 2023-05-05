import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import { codeAttributes } from '../../constants/variables';
import { Typography, Box } from '@mui/material';

const attributeEntryComparator = (a, b) => {
  const aIdx = codeAttributes.indexOf(a[0]);
  const bIdx = codeAttributes.indexOf(b[0]);
  return aIdx - bIdx;
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

const CodeAttributesEditor = ({ readOnlyFields }) => {
  const { t } = useTranslation();
  const { values, setValues } = useForm();

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
        ...Object.entries(values)
          .sort(attributeEntryComparator)
          .map(([key, attributes], i) => (
            <AttributeEditor
              key={`${key}-${i}`}
              attributeLabel={t(key)}
              attributeKey={`${key}`}
              valueLabel={t('attribute_value')}
              path={key}
              data={attributes}
              onChange={(newData) =>
                setValues({
                  ...values,
                  [key]: newData,
                })
              }
            />
          )),
      ]}
    </Stack>
  );
};

export default CodeAttributesEditor;
