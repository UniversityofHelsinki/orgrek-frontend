import React from 'react';
import { createSvgIcon } from '@mui/material/utils';

// Rotated HYDS RotateLeft icon
const Replay = createSvgIcon(
  <svg viewBox="0 0 1000 1000">
    <path
      transform="rotate(90, 500, 500)"
      d="M555 129q-99 0-183 49-81 48-129 130-49 84-49 182v155L68 516 0 587l245 252 239-255-71-68-123 132V494q0-73 37-136 35-60 96-96t132-36 132 35 97 97 35 132-36 132-96 97q-63 36-135 36h-4v97h7q100 0 185-50 82-47 130-129 49-84 49-183t-49-182q-48-82-130-130-85-49-185-49zM242 700l-7-6h10z"
    />
  </svg>,
  'Replay'
);

export default Replay;
