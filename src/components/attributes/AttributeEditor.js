import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AttributeEditorRow from './AttributeEditorRow';

/**
 * Edits single attribute having multiple values with different validity date ranges.
 *
 * By default, uses TextField for editing the value but this can be customized
 * by passing a custom render function as renderValueField prop.
 */
const AttributeEditor = ({
  attributeLabel,
  valueLabel,
  data,
  onChange,
  renderValueField,
  sx,
}) => {
  const createRow = () => ({
    // Also new rows must have some unique id before they are stored to database
    id: Math.floor(Math.random() * -1000000),
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

  const insert = (arr, index, ...newItems) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted items
    ...newItems,
    // part of the array after the specified index
    ...arr.slice(index),
  ];

  const handleInsertBefore = (index) => {
    const newRow = createRow();
    data.splice(index, 0, newRow);
    onChange(data);
  };

  const handleInsertAfter = (index) => {
    const newRow = createRow();
    data.splice(index + 1, 0, newRow);
    onChange(data);
  };

  // Display a blank row if data is empty
  const values = data.length > 0 ? data : [createRow()];

  const renderedRows = values.map((value, index) => (
    <AttributeEditorRow
      key={`${value.id}`}
      valueLabel={valueLabel}
      value={value}
      onChange={(newValue) => handleChange(index, newValue)}
      onInsertBefore={() => handleInsertBefore(index)}
      onInsertAfter={() => handleInsertAfter(index)}
      renderValueField={renderValueField}
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
};

export default AttributeEditor;
