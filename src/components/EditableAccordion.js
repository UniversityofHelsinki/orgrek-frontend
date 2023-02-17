import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const EditableAccordion = ({
  children,
  title,
  modified = false,
  defaultExpanded = false,
  onChange = () => {},
  ...props
}) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleChange = (event, newValue) => {
    if (modified) {
      return;
    }

    setExpanded(newValue);
    onChange(event, newValue);
  };

  const modifiedText = modified && (
    <Typography variant="body1" component="span" color="text.secondary" ml={3}>
      {t('accordion.modifiedSaveBeforeClosing')}
    </Typography>
  );

  const summary = (
    <AccordionSummary
      disabled={modified}
      sx={{
        ...(modified && {
          '&.Mui-disabled': {
            opacity: 1,
          },
        }),
      }}
    >
      {title}
      {modifiedText}
    </AccordionSummary>
  );

  return (
    <Accordion
      {...props}
      expanded={modified || expanded}
      onChange={handleChange}
    >
      {summary}
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default EditableAccordion;
