import React from 'react';
import { createSvgIcon } from '@mui/material/utils';

const ExternalLink = createSvgIcon(
  <svg viewBox="0 0 1000 1000">
    <path d="M786 518v178q0 67-47 114t-114 47H161q-67 0-114-47T0 696V232q0-66 47-114t114-47h393q7 0 12 5t5 13v36q0 8-5 13t-12 5H161q-37 0-63 26t-27 63v464q0 37 27 63t63 27h464q37 0 63-27t26-63V518q0-8 5-13t13-5h36q8 0 13 5t5 13zm214-482v285q0 15-10 25t-25 11-26-10l-98-99-364 364q-5 6-12 6t-14-6l-63-63q-6-6-6-14t6-12l364-364-99-98q-10-11-10-26t11-25 25-10h285q15 0 26 10t10 26z" />
  </svg>,
  'ExternalLink'
);

export default ExternalLink;
