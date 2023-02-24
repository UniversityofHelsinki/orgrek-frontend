import React from 'react';
import { useTranslation } from 'react-i18next';
import { showValidity } from '../../actions/utilAction';

const Validity = ({ startDate, endDate }) => {
  const { t, i18n } = useTranslation();

  return (
    <span data-testid="validity">
      {showValidity(startDate, endDate, i18n, t)}
    </span>
  );
};

export default Validity;
