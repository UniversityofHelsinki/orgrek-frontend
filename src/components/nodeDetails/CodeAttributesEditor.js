import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import { codeAttributes } from '../../constants/variables';
import TextField from '../inputs/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Box } from '@mui/material';
import DateField from '../inputs/DateField';
import { t } from 'i18next';

const attributeEntryComparator = (a, b) => {
  const aIdx = codeAttributes.indexOf(a[0]);
  const bIdx = codeAttributes.indexOf(b[0]);
  return aIdx - bIdx;
};

const DummyField = ({ label, value }) => {
  return (
    <Box component="fieldset">
      <Typography component="legend" variant="h6" mb={2}>
        {label}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ marginRight: 6 }}>
        <Grid flex="auto" container xs={11} rowSpacing={2} columnSpacing={2}>
          <Grid xs={12} sm={12} md={6}>
            <TextField label={t('value')} disabled fullWidth value={value} />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <DateField label={t('attribute.validFrom')} disabled />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <DateField label={t('attribute.validUntil')} disabled />
          </Grid>
        </Grid>
      </Stack>
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
            <DummyField
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
