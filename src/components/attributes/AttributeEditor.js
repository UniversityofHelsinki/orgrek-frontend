import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AttributeEditorRow from './AttributeEditorRow';
import parseISO from 'date-fns/parseISO';
import { addDays, formatISO } from 'date-fns';

/**
 * Edits single attribute having multiple values with different validity date ranges.
 *
 * By default, uses TextField for editing the value but this can be customized
 * by passing a custom render function as renderValueField prop.
 */
const AttributeEditor = ({
  attributeLabel,
  valueLabel,
  path,
  data,
  onChange,
  renderValueField,
  getDisplayText,
  sx,
  attributeKey,
}) => {
  const createRow = () => ({
    // Also new rows must have some unique id before they are stored to database
    id: Math.floor(Math.random() * -1000000),
    key: attributeKey,
    value: null,
    startDate: null,
    endDate: null,
    isNew: true,
    deleted: false,
  });

  const handleChange = (index, newValue) => {
    const newData = [...data];
    newData[index] = newValue;
    onChange(newData);
  };

  const updateEndDate = (oldrow, date) => {
    return { ...oldrow, endDate: formatISO(date, { representation: 'date' }) };
  };

  const updateDates = (oldrow, row, days) => {
    if (oldrow.endDate === null || !oldrow.endDate) {
      const date = new Date();
      const startDate = addDays(date, days);
      row.startDate = formatISO(startDate, { representation: 'date' });
      return date;
    } else {
      const parsedDate = parseISO(oldrow.endDate);
      const startDate = addDays(parsedDate, days);
      row.startDate = formatISO(startDate, { representation: 'date' });
      return null;
    }
  };

  const handleInsertBefore = (index) => {
    let newRow = createRow();
    const oldRow = values[index];
    const endDate = updateDates(oldRow, newRow, 1);
    const newData = data.length !== 0 ? [...data] : [{ ...oldRow }];
    if (endDate !== null) {
      newData[index] = updateEndDate(newData[index], endDate);
    }
    newData.splice(index, 0, newRow);
    onChange(newData);
  };

  const handleInsertAfter = (index) => {
    let newRow = createRow();
    const oldRow = values[index];
    const newData = data.length !== 0 ? [...data] : [{ ...oldRow }];
    newData.splice(index + 1, 0, newRow);
    onChange(newData);
  };

  // Display a blank row if data is empty
  const values = data.length > 0 ? data : [createRow()];

  const renderedRows = values.map((value, index) => (
    <AttributeEditorRow
      key={`${value.id}`}
      valueLabel={valueLabel}
      value={value}
      path={`${path}[${index}]`}
      onChange={(newValue) => handleChange(index, newValue)}
      onInsertBefore={() => handleInsertBefore(index)}
      onInsertAfter={() => handleInsertAfter(index)}
      renderValueField={renderValueField}
      getDisplayText={getDisplayText}
    />
  ));

  return (
    <Box component="fieldset" sx={sx}>
      <Typography component="legend" variant="h6" mb={2}>
        {attributeLabel}
      </Typography>
      <Stack spacing={{ xs: 4, md: 2 }}>{renderedRows}</Stack>
    </Box>
  );
};

AttributeEditor.propTypes = {
  /** Fieldset legend displayed above the values */
  attributeLabel: PropTypes.string,

  /** Label of value text field */
  valueLabel: PropTypes.string,

  /** The path in form values where to look for validation schema and errors */
  path: PropTypes.string.isRequired,

  /** Array of attribute values and dates */
  data: PropTypes.arrayOf(PropTypes.shape(AttributeEditorRow.propTypes.value))
    .isRequired,

  /**
   * Called when the data changes.
   *
   * The first argument of the function contains the modified data.
   * */
  onChange: PropTypes.func.isRequired,

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

  /**
   *
   */
  attributeKey: PropTypes.string.isRequired,
};

export default AttributeEditor;
