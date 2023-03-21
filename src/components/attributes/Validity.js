import React from 'react';
import { showValidity } from '../../actions/utilAction';

const Validity = ({ startDate, endDate }) => {
  return <span data-testid="validity">{showValidity(startDate, endDate)}</span>;
};

export default Validity;
