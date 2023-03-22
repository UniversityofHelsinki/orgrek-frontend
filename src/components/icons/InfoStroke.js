import React from 'react';
import { createSvgIcon } from '@mui/material/utils';

const InfoStroke = createSvgIcon(
  <svg viewBox="0 0 1000 1000">
    <path d="M500 161q92 0 171 47 77 44 121 121 47 79 47 171t-47 171q-44 77-121 121-79 47-171 47t-171-47q-77-44-121-121-47-79-47-171t47-171q44-77 121-121 79-47 171-47zm0-96q-119 0-220 59-99 57-156 156-59 101-59 220t59 220q57 99 156 156 101 59 220 59t220-59q99-57 156-156 59-101 59-220t-59-220q-57-99-156-156-101-59-220-59zm-48 354h96v258h-96V419zm0-129h96v97h-96v-97z" />
  </svg>,
  'InfoStroke'
);

export default InfoStroke;
