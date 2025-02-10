import React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import CaretDownIcon from './icons/CaretDown';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Colours from './utilities/HyColours';

export const AccordionSummary = ({ children, sx, ...props }) => {
  return (
    <MuiAccordionSummary
      {...props}
      expandIcon={<CaretDownIcon fill={Colours.blue} fontSize="small" />}
      sx={{
        flexDirection: 'row-reverse',
        gap: 1,
        ...sx,
      }}
    >
      <Typography variant="accordionTitle">{children}</Typography>
    </MuiAccordionSummary>
  );
};

export const AccordionDetails = ({ children, sx, ...props }) => (
  <MuiAccordionDetails {...props} sx={{ pt: 0, ...sx }}>
    <Divider color={Colours.darkGray} role="presentation" />
    <Box mt={2}>{children}</Box>
  </MuiAccordionDetails>
);

export const Accordion = ({ children, sx, ...props }) => {
  return (
    <MuiAccordion
      {...props}
      disableGutters
      elevation={0}
      sx={[
        {
          marginBottom: 1.5,
          backgroundColor: 'grey.100',
          borderColor: 'grey.100',
          borderStyle: 'solid',
          borderWidth: 1,
          '&:last-of-type': {
            marginBottom: 0,
          },
          '&.Mui-expanded': {
            backgroundColor: 'background.paper',
            borderColor: 'grey.500',
            borderStyle: 'solid',
          },
          '&:before': {
            display: 'none',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </MuiAccordion>
  );
};
