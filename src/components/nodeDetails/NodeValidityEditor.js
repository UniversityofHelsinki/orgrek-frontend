import React from 'react';
import useForm from '../../hooks/useForm';
import Grid from '@mui/material/Unstable_Grid2';
import StartDateField from '../attributes/StartDateField';
import EndDateField from '../attributes/EndDateField';

const NodeValidityEditor = () => {
  const { values, setValues } = useForm();

  return (
    <Grid container>
      <Grid xs={12} sm={6} md={3}>
        <StartDateField
          path="startDate"
          value={values.startDate}
          onChange={setValues}
        />
      </Grid>
      <Grid xs={12} sm={6} md={3}>
        <EndDateField
          path="endDate"
          value={values.endDate}
          onChange={setValues}
        />
      </Grid>
    </Grid>
  );
};

export default NodeValidityEditor;
