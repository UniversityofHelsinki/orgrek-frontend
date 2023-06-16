import React from 'react';
import { createSvgIcon } from '@mui/material/utils';

const Plus = createSvgIcon(
  <svg viewBox="0 0 1000 1000">
    <path d="M903 419H581V65H419v354H65v162h354v354h162V581h354V419h-32z" />
  </svg>,
  'Plus'
);

export default Plus;
