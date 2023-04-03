import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import useEditMode from '../hooks/useEditMode';
import { EditModeProvider } from '../contexts/EditModeContext';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const EditableAccordion = ({
  children,
  title,
  onChange = () => {},
  defaultExpanded = true,
  ...props
}) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { modified } = useEditMode();

  // This can be replaced with useId hook after upgrading to React 18
  // See: https://react.dev/reference/react/useId
  const id = title.toLowerCase().replace(/\s/, '');

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
      id={`${id}-summary`}
      aria-controls={`${id}-details`}
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

/**
 * An accordion with an edit mode context
 */
const EditableAccordionWrapper = ({
  defaultModified = false,
  loading = false,
  ...props
}) => {
  // Render loading placeholder outside EditableAccordion so that the initial
  // state of expanded resets when loading is completed.
  if (loading) {
    return (
      <Box mb={1.5}>
        <Skeleton variant="rectangular" height={48} />
      </Box>
    );
  }

  // EditableAccordion is wrapped into EditModeProvider because every
  // accordion needs its own edit mode context
  return (
    <EditModeProvider defaultModified={defaultModified}>
      <EditableAccordion {...props} />
    </EditModeProvider>
  );
};

EditableAccordionWrapper.propTypes = {
  /** Title text displayed in the accordion summary */
  title: PropTypes.string.isRequired,

  /** If true, accordion is initially expanded */
  defaultExpanded: PropTypes.bool,

  /** If true, modified indicator is initially displayed in accordion summary */
  defaultModified: PropTypes.bool,

  /** If true, accordion cannot be collapsed or expanded */
  disabled: PropTypes.bool,

  /** If true, renders a loading placeholder in place of the accordion */
  loading: PropTypes.bool,

  /** Called when the accordion is collapsed or expanded */
  onChange: PropTypes.func,
};

export default EditableAccordionWrapper;
