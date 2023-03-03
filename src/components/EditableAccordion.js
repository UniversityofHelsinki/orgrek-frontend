import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import useEditMode from '../hooks/useEditMode';
import { EditModeProvider } from '../contexts/EditModeContext';

const EditableAccordion = ({
  children,
  title,
  onChange = () => {},
  renderActions = () => {},
  renderEditor = () => {},
  defaultExpanded = true,
  ...props
}) => {
  const { t } = useTranslation();

  // TODO: pass !empty from sections to defaultExpanded prop
  // However currently it does work work correctly because when changing
  // the current node, this component gets rendered first time with data of the
  // previous node, so the initialState would reflect the emptiness of that
  // node. To fix this, there should be a way to check if node details are being
  // currently fetched, and only render this component after the current data
  // is available. Migrating to Redux Toolkit Query would probably make it
  // much easier.
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { modified } = useEditMode();

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

// Every EditableAccordion needs its own edit mode context
const EditableAccordionWrapper = ({ defaultModified = false, ...props }) => (
  <EditModeProvider defaultModified={defaultModified}>
    <EditableAccordion {...props} />
  </EditModeProvider>
);

export default EditableAccordionWrapper;
