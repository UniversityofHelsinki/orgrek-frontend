import React from 'react';
import { createSvgIcon } from '@mui/material/utils';

const Spinner = createSvgIcon(
  <svg viewBox="0 0 1000 1000">
    <path d="M500 1000q-99 0-190-37T146 856 36 692Q0 601 0 501t38-192 107-163T308 36Q399 0 499 0t192 37 163 107 110 163q36 90 36 193 0 27-19 46t-45 19-46-19-19-46q0-75-28-143t-82-118q-50-53-118-82t-143-28-143 28-118 82q-53 50-81 118t-29 143 29 143 81 118q53 53 121 81t140 29h16v129h-16z" />
  </svg>,
  'Spinner'
);

export default Spinner;
