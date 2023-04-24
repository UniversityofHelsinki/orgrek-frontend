import React from 'react';
import { showValidity } from '../../utils/showValidity';

const Validity = ({ startDate, endDate }) => {
  return <span data-testid="validity">{showValidity(startDate, endDate)}</span>;
};

export default Validity;
