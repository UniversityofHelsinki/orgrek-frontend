import React from 'react';
import useForm from '../../hooks/useForm';
import Grid from '@mui/material/Unstable_Grid2';
import DateField from '../inputs/DateField';
import {
  getMaxStartDate,
  getMin,
  getMinEndDate,
} from '../../utils/validationUtils';
import HelperText from '../inputs/HelperText';
import { useTranslation } from 'react-i18next';
import useFormField from '../../hooks/useFormField';

const NodeValidityEditor = () => {
  const { values, validationSchema } = useForm();
  const { t } = useTranslation();
  const { props: startDateProps, errors: startDateErrors } = useFormField({
    name: 'startDate',
  });
  const { props: endDateProps, errors: endDateErrors } = useFormField({
    name: 'endDate',
  });

  return (
    <Grid container spacing={2} mt={1}>
      <Grid xs={12} sm={6} md={3}>
        <DateField
          {...startDateProps}
          fullWidth
          label={t('attribute.validFrom')}
          helperText={<HelperText errors={startDateErrors} />}
          minDate={getMin(validationSchema, 'startDate')}
          maxDate={getMaxStartDate(validationSchema, 'startDate', values)}
        />
      </Grid>
      <Grid xs={12} sm={6} md={3}>
        <DateField
          {...endDateProps}
          fullWidth
          label={t('attribute.validUntil')}
          helperText={<HelperText errors={endDateErrors} />}
          minDate={getMinEndDate(validationSchema, 'endDate', values)}
        />
      </Grid>
    </Grid>
  );
};

export default NodeValidityEditor;
