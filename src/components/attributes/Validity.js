import React from 'react';
import { useTranslation } from 'react-i18next';
import { showValidity } from '../../actions/utilAction';
import Typography from '@mui/material/Typography';

const Validity = ({ startDate, endDate }) => {
  const { t, i18n } = useTranslation();

  return (
    <Typography component="span" variant="body1" data-testid="validity">
      {showValidity(startDate, endDate, i18n, t)}
    </Typography>
  );
};

export default Validity;
