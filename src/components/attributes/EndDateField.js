import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import DateField from '../inputs/DateField';
import HelperText from '../inputs/HelperText';
import { useTranslation } from 'react-i18next';
import { filterEmpty, getErrors } from '../../utils/validationUtils';
import addDays from 'date-fns/addDays';
import PropTypes from 'prop-types';
import parseISO from 'date-fns/parseISO';

/**
 * Renders a date field for editing attribute end date.
 *
 * A subcomponent of AttributeEditor.
 */
const EndDateField = ({ path, value, onChange }) => {
  const { t } = useTranslation();
  const { errors } = useForm();

  // TODO: Remove this state (OR-1031)
  const [endDateError, setEndDateError] = useState(null);

  // TODO: remove endDateError and use only errors from useForm (OR-1031)
  const endDateErrors = filterEmpty([
    endDateError,
    ...getErrors(errors, `${path}.endDate`),
  ]);

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

  return (
    <DateField
      label={t('attribute.validUntil')}
      fullWidth
      value={value.endDate}
      onChange={handleDateEndChange}
      minDate={
        value.startDate !== null ? addDays(parseISO(value.startDate), 2) : null
      }
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
};

export default EndDateField;
