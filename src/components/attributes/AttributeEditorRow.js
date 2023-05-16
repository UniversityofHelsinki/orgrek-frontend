import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Grow from '@mui/material/Grow';
import DeletedAttributeRow from './DeletedAttributeRow';
import { getValueDescription } from '../../utils/attributeUtils';
import DeletedAttributeRowActions from './DeletedAttributeRowActions';
import AttributeEditorRowActions from './AttributeEditorRowActions';
import ValueField from './ValueField';
import StartDateField from './StartDateField';
import EndDateField from './EndDateField';

/**
 * Edits a single attribute value with a start date and an end date.
 *
 * By default, uses TextField for editing the value but this can be customized
 * by passing a custom render function as renderValueField prop.
 */
const AttributeEditorRow = ({
  valueLabel,
  value,
  path,
  onChange,
  onInsertBefore,
  onInsertAfter,
  renderValueField,
  getDisplayText,
}) => {
  // True after user has interacted with the row
  const [touched, setTouched] = useState(false);

  const handleDelete = () => {
    setTouched(true);
    onChange({
      ...value,
      deleted: true,
    });
  };

  const handleUndoDelete = () => {
    setTouched(true);
    onChange({
      ...value,
      deleted: false,
    });
  };

  const valueDescription = getValueDescription({
    value,
    displayText: getDisplayText ? getDisplayText(value) : value.value,
    withValidity: true,
  });

  let renderedRow;
  let renderedActions;

  if (value.deleted) {
    renderedRow = (
      <Grid xs={12}>
        <DeletedAttributeRow value={value} getDisplayText={getDisplayText} />
      </Grid>
    );

    renderedActions = (
      <DeletedAttributeRowActions
        onUndoDelete={handleUndoDelete}
        valueDescription={valueDescription}
        sx={{ pt: 1 }}
      />
    );
  } else {
    renderedRow = (
      <>
        <Grid xs={12} sm={12} md={6}>
          <ValueField
            label={valueLabel}
            path={path}
            value={value}
            onChange={onChange}
            renderValueField={renderValueField}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StartDateField path={path} value={value} onChange={onChange} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <EndDateField path={path} value={value} onChange={onChange} />
        </Grid>
      </>
    );

    renderedActions = (
      <AttributeEditorRowActions
        onInsertBefore={onInsertBefore}
        onInsertAfter={onInsertAfter}
        onDelete={handleDelete}
        valueDescription={valueDescription}
        sx={{ pt: 1 }}
      />
    );
  }

  return (
    <Box
      sx={{
        '&:last-of-type': {
          marginBottom: 0,
        },
        '.actions': {
          // Apply hover effect to actions only in desktop
          opacity: { xs: 1, md: 0 },
        },
        ':hover .actions, :focus-within .actions, .actions.menuOpen': {
          opacity: 1,
        },
      }}
    >
      <Stack direction="row" spacing={1}>
        <Grow in appear={value.isNew || touched} key={value.deleted}>
          <Grid flex="auto" container xs={11} rowSpacing={2} columnSpacing={2}>
            {renderedRow}
          </Grid>
        </Grow>
        {renderedActions}
      </Stack>
    </Box>
  );
};

AttributeEditorRow.propTypes = {
  /** Label of the value text field */
  valueLabel: PropTypes.string,

  /** The path in form values where to look for validation schema and errors */
  path: PropTypes.string.isRequired,

  /** Attribute value with start and end dates */
  value: PropTypes.shape({
    /** Must be unique on every row */
    id: PropTypes.number.isRequired,

    /** Attribute value */
    value: PropTypes.any,

    /** Validity start date, ISO 8601 date string without time component */
    startDate: PropTypes.string,

    /** Validity end date, ISO 8601 date string without time component */
    endDate: PropTypes.string,

    /* True if the row has not yet been saved to database */
    isNew: PropTypes.bool,

    /** Soft deletion marker so that it can be reverted */
    deleted: PropTypes.bool,
  }).isRequired,

  /** Called when the value changes, taking the new value as the first argument */
  onChange: PropTypes.func.isRequired,

  /** Called when 'insert row before' action is clicked */
  onInsertBefore: PropTypes.func.isRequired,

  /** Called when 'insert row after' action is clicked */
  onInsertAfter: PropTypes.func.isRequired,

  /**
   * Allows customizing how the value field is rendered.
   *
   * The first argument of this function contains default props that should be
   * passed to TextField
   */
  renderValueField: PropTypes.func,

  /**
   * Specifies how the value should be displayed in view mode and a11y
   * description.
   *
   * Takes an attribute object as the first arg and returns the display text as
   * string.
   */
  getDisplayText: PropTypes.func,
};

export default AttributeEditorRow;
