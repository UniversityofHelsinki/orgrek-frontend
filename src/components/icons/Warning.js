import React from 'react';
import { createSvgIcon } from '@mui/material/utils';

const Warning = createSvgIcon(
  <svg viewBox="0 0 1000 1000">
    <path d="M500 129L65 871h870zm48 645h-96v-97h96v97zm-96-129V387h96v258h-96z" />
  </svg>,
  'Warning'
);

export default Warning;
