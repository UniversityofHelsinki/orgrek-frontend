import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '../inputs/TextField';
import DateField from '../inputs/DateField';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Grow from '@mui/material/Grow';
import DeletedAttributeRow from './DeletedAttributeRow';
import { getValueDescription } from './attributeUtils';
import DeletedAttributeRowActions from './DeletedAttributeRowActions';
import AttributeEditorRowActions from './AttributeEditorRowActions';
import useForm from '../../hooks/useForm';
import HelperText from '../inputs/HelperText';

const getErrors = (errors, path) => (errors && errors[path]) || [];

const filterEmpty = (errors) => errors.filter((error) => Boolean(error));

/**
 * Edits a single attribute value with a start date and an end date.
 *
 * By default, uses TextField for editing the value but this can be customized
 * by passing a custom render function as renderValueField prop.
 */
// TODO: refactor complexity
// eslint-disable-next-line complexity
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
  const { t } = useTranslation();
  const { errors } = useForm();

  // TODO: Remove these states (OR-1031)
  const [valueError, setValueError] = useState(null);
  const [startDateError, setStartDateError] = useState(null);
  const [endDateError, setEndDateError] = useState(null);

  // True after user has interacted with the row
  const [touched, setTouched] = useState(false);

  // TODO: remove valueError, startDateError and endDateError (OR-1031)
  const valueErrors = filterEmpty([
    valueError,
    ...getErrors(errors, `${path}.value`),
  ]);
  const startDateErrors = filterEmpty([
    startDateError,
    ...getErrors(errors, `${path}.startDate`),
  ]);
  const endDateErrors = filterEmpty([
    endDateError,
    ...getErrors(errors, `${path}.endDate`),
  ]);

  const handleValueChange = (event) => {
    const newValue = event.target.value;

    if (!newValue) {
      setValueError(t('attribute.required'));
    } else {
      setValueError(null);
    }

    onChange({
      ...value,
      value: newValue,
    });
  };

  const handleLeavingFocus = (event) => {
    const newValue = event.target.value;
    if (newValue.endsWith(' ') || newValue.startsWith(' ')) {
      onChange({
        ...value,
        value: newValue.trim(),
      });
    }
  };

  const handleDateStartChange = (date) => {
    if (date !== null && !isValid(date)) {
      setStartDateError(t('invalidDate'));
      onChange({
        ...value,
        startDate: 'invalid date',
      });
    } else if (date === null) {
      setStartDateError(t('attribute.required'));
      onChange({
        ...value,
        startDate: 'invalid date',
      });
    } else if (date.getFullYear() < 1600) {
      setStartDateError(t('invalidDate'));
      onChange({
        ...value,
        startDate: 'invalid date',
      });
    } else {
      setStartDateError(null);
      onChange({
        ...value,
        startDate: date && format(date, 'yyyy-MM-dd'),
      });
    }
  };

  const handleDateEndChange = (date) => {
    if (date !== null && !isValid(date)) {
      setEndDateError(t('invalidDate'));

      onChange({
        ...value,
        endDate: 'invalid date',
      });

      return;
    }

    setEndDateError(null);

    onChange({
      ...value,
      endDate: date && format(date, 'yyyy-MM-dd'),
    });
  };

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

  const valueFieldProps = {
    label: valueLabel || t('value'),
    value: value.value || '',
    onChange: handleValueChange,
    fullWidth: true,
    required: true,
    error: valueErrors.length > 0,
    helperText: <HelperText errors={valueErrors} />,
    inputProps: { maxLength: 250 },
    onBlur: handleLeavingFocus,
  };

  const renderedValueField = renderValueField ? (
    renderValueField(valueFieldProps)
  ) : (
    <TextField data-testid="attributeValueTextField" {...valueFieldProps} />
  );

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const renderedStartDateField = (
    <DateField
      required
      label={t('attribute.validFrom')}
      margin="normal"
      value={value.startDate}
      onChange={handleDateStartChange}
      maxDate={value.endDate !== null ? addDays(value.endDate, -2) : null}
      fullWidth
      onError={(reason) => {
        if (reason) {
          //setStartDateError(t('reason')); Kommenteissa, että näkee virheen "nimen",
          //joka lisätään käännösteksteihin. Tämä koodirivi otetaan käyttöön kun pääsee lisäämään
          //käännöstekstin. Samalla alla oleva rivi poistetaan.
          setStartDateError(reason);
        } else {
          setStartDateError(null);
        }
      }}
      error={startDateErrors.length > 0}
      helperText={<HelperText errors={startDateErrors} />}
    />
  );

  const renderedEndDateField = (
    <DateField
      label={t('attribute.validUntil')}
      fullWidth
      value={value.endDate}
      onChange={handleDateEndChange}
      minDate={value.startDate !== null ? addDays(value.startDate, 2) : null}
      onError={(reason) => {
        if (reason) {
          //setEndDateError(t('reason')); Kommenteissa, että näkee virheen "nimen",
          //joka lisätään käännösteksteihin. Tämä koodirivi otetaan käyttöön kun pääsee lisäämään
          //käännöstekstin. Samalla alla oleva rivi poistetaan.
          setEndDateError(reason);
        } else {
          setEndDateError(null);
        }
      }}
      error={endDateErrors.length > 0}
      helperText={<HelperText errors={endDateErrors} />}
    />
  );

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
          {renderedValueField}
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          {renderedStartDateField}
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          {renderedEndDateField}
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
    value: PropTypes.string,

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
