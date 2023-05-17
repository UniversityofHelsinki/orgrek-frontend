import React from 'react';
import useForm from '../../hooks/useForm';
import DateField from '../inputs/DateField';
import HelperText from '../inputs/HelperText';
import { useTranslation } from 'react-i18next';
import {
  getErrors,
  getMax,
  getMinEndDate,
  isRequired,
} from '../../utils/validationUtils';
import PropTypes from 'prop-types';

/**
 * Renders a date field for editing attribute end date.
 *
 * A subcomponent of AttributeEditor.
 */
const EndDateField = ({ path, value, onChange, label }) => {
  const { t } = useTranslation();
  const { errors, validationSchema } = useForm();

  const endDatePath = `${path}.endDate`;
  const endDateErrors = getErrors(errors, endDatePath);

  const handleChange = (date) => {
    onChange({
      ...value,
      endDate: date,
    });
  };

  return (
    <DateField
      required={isRequired(validationSchema, endDatePath)}
      label={label || t('attribute.validUntil')}
      fullWidth
      value={value.endDate}
      onChange={handleChange}
      minDate={getMinEndDate(validationSchema, endDatePath, value)}
      maxDate={getMax(validationSchema, endDatePath)}
      error={endDateErrors.length > 0}
      helperText={<HelperText errors={endDateErrors} />}
    />
  );
};

EndDateField.propTypes = {
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

  /** Label of the date field */
  label: PropTypes.string,
};

export default EndDateField;
