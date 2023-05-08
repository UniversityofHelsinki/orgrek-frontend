import React from 'react';
import useForm from '../../hooks/useForm';
import Grid from '@mui/material/Unstable_Grid2';
import DateField from '../inputs/DateField';
import {
  getErrors,
  getMaxStartDate,
  getMin,
  getMinEndDate,
} from '../../utils/validationUtils';
import HelperText from '../inputs/HelperText';
import { useTranslation } from 'react-i18next';

const NodeValidityEditor = () => {
  const { values, setValues, validationSchema, errors } = useForm();
  const { t } = useTranslation();
  const startDateErrors = getErrors(errors, 'startDate');
  const endDateErrors = getErrors(errors, 'endDate');

  return (
    <Grid container spacing={2} mt={1}>
      <Grid xs={12} sm={6} md={3}>
        <DateField
          label={t('attribute.validFrom')}
          minDate={getMin(validationSchema, 'startDate')}
          maxDate={getMaxStartDate(validationSchema, 'startDate', values)}
          fullWidth
          error={startDateErrors.length > 0}
          helperText={<HelperText errors={startDateErrors} />}
          value={values.startDate}
          onChange={(date) => setValues({ ...values, startDate: date })}
        />
      </Grid>
      <Grid xs={12} sm={6} md={3}>
        <DateField
          label={t('attribute.validUntil')}
          minDate={getMinEndDate(validationSchema, 'endDate', values)}
          fullWidth
          error={endDateErrors.length > 0}
          helperText={<HelperText errors={endDateErrors} />}
          value={values.endDate}
          onChange={(date) => setValues({ ...values, endDate: date })}
        />
      </Grid>
    </Grid>
  );
};

export default NodeValidityEditor;
