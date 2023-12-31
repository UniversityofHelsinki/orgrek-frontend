import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AttributeEditorRow from './AttributeEditorRow';
import parseISO from 'date-fns/parseISO';
import { addDays, formatISO } from 'date-fns';
import Button from '../inputs/Button';
import { t } from 'i18next';
import useForm from '../../hooks/useForm';

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
  fields,
  renderValueField,
  getDisplayText,
  attributeKey,
  overlap,
  sx,
  customCreateRow,
}) => {
  const { getValue, setValue } = useForm();
  const focusRef = useRef();

  useEffect(() => {
    if (focusRef.current) {
      const inputContainer = focusRef.current;
      const inputField = inputContainer.querySelector('input');
      if (!inputField.getAttribute('aria-hidden')) {
        inputField.focus();
      } else {
        const fallback = inputContainer.querySelector('div[tabindex]');
        if (fallback) {
          fallback.focus();
        }
      }
    }
  }, [focusRef.current]);

  const values = getValue(path) || data;
  if (!Array.isArray(values)) {
    throw new Error(`Form values at ${path} must be an array`);
  }

  const createRow =
    customCreateRow ||
    (() => ({
      // Also new rows must have some unique id before they are stored to database
      id: Math.floor(Math.random() * -1000000),
      key: attributeKey,
      value: null,
      startDate: null,
      endDate: null,
      isNew: true,
      deleted: false,
      focus: true,
    }));

  const setFormValues = (newValues) => {
    setValue(path, newValues);
    onChange && onChange(newValues);
  };

  const updateEndDate = (oldrow, date) => {
    return { ...oldrow, endDate: formatISO(date, { representation: 'date' }) };
  };

  const updateDates = (oldrow, row, days) => {
    if (overlap) {
      return null;
    }

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
    const newValues = values.length !== 0 ? [...values] : [{ ...oldRow }];
    newValues.splice(index, 0, newRow);
    setFormValues(newValues);
  };

  const handleInsertAfter = (index) => {
    let newRow = createRow();
    const oldRow = values[index];
    const newValues = values.length !== 0 ? [...values] : [{ ...oldRow }];
    newValues.splice(index + 1, 0, newRow);
    setFormValues(newValues);
  };

  const renderedRows = values.map((value, index) => (
    <AttributeEditorRow
      key={`${value.id}`}
      valueLabel={valueLabel}
      value={value}
      path={`${path}[${index}]`}
      onInsertBefore={() => handleInsertBefore(index)}
      onInsertAfter={() => handleInsertAfter(index)}
      fields={fields}
      renderValueField={renderValueField}
      getDisplayText={getDisplayText}
      focusRef={value.focus ? focusRef : undefined}
    />
  ));

  const addFirstRow = () => {
    setFormValues([createRow()]);
  };

  const addRowButton = (
    <Button
      onClick={addFirstRow}
      variant="outlined"
      sx={{ marginBottom: '20px' }}
    >
      {t('add_row')}
    </Button>
  );

  return (
    <Box component="fieldset" sx={sx || {}}>
      <Typography component="legend" variant="h6" mb={2}>
        {attributeLabel}
      </Typography>
      <Stack spacing={{ xs: 4, md: 2 }}>{renderedRows}</Stack>
      {renderedRows.length === 0 && addRowButton}
    </Box>
  );
};

AttributeEditor.propTypes = {
  /** Fieldset legend displayed above the values */
  attributeLabel: PropTypes.string,

  /**
   * Label of the value text field.
   *
   * @deprecated use fields prop instead
   */
  valueLabel: PropTypes.string,

  /** The path in form values where to look for validation schema and errors */
  path: PropTypes.string.isRequired,

  /**
   * Array of attribute values and dates.
   *
   * @deprecated pass data through form context instead
   */
  data: PropTypes.arrayOf(PropTypes.shape(AttributeEditorRow.propTypes.value)),

  /**
   * Called when the data changes.
   *
   * The first argument of the function contains the modified data.
   *
   * @deprecated use useForm hook instead
   */
  onChange: PropTypes.func,

  /**
   * Allows customizing how the value field is rendered.
   *
   * The first argument of this function contains default props that should be
   * passed to TextField
   *
   * @deprecated use fields prop instead
   */
  renderValueField: PropTypes.func,

  /** Allows customizing how the row is rendered. */
  fields: AttributeEditorRow.propTypes.fields,

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

  /**
   * If true, the attribute may have multiple values with overlapping validity
   * date ranges. In that case, existing value's validity should not be changed
   * when inserting a new row above or below.
   */
  overlap: PropTypes.bool,
  /**
   * Returns custom attribute object for new rows.
   */
  customCreateRow: PropTypes.func,
  /**
   * sx object that will be passed to the container of this AttributeEditor
   * instance.
   */
  sx: PropTypes.object,
};

export default AttributeEditor;
