import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import DateField from '../inputs/DateField';
import HelperText from '../inputs/HelperText';
import { useTranslation } from 'react-i18next';
import { filterEmpty, getErrors } from '../../utils/validationUtils';
import subDays from 'date-fns/subDays';
import PropTypes from 'prop-types';
import parseISO from 'date-fns/parseISO';

/**
 * Renders a date field for editing attribute start date.
 *
 * A subcomponent of AttributeEditor.
 */
const StartDateField = ({ path, value, onChange }) => {
  const { t } = useTranslation();
  const { errors } = useForm();

  // TODO: Remove this state (OR-1031)
  const [startDateError, setStartDateError] = useState(null);

  // TODO: remove startDateError and use only errors from useForm (OR-1031)
  const startDateErrors = filterEmpty([
    startDateError,
    ...getErrors(errors, `${path}.startDate`),
  ]);

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

  return (
    <DateField
      required
      label={t('attribute.validFrom')}
      margin="normal"
      value={value.startDate}
      onChange={handleDateStartChange}
      maxDate={
        value.endDate !== null ? subDays(parseISO(value.endDate), 2) : null
      }
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
};

StartDateField.propTypes = {
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
};

export default StartDateField;
