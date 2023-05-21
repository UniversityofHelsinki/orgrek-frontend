import React from 'react';
import useForm from '../../hooks/useForm';
import DateField from '../inputs/DateField';
import HelperText from '../inputs/HelperText';
import { useTranslation } from 'react-i18next';
import { getMax, getMinEndDate } from '../../utils/validationUtils';
import PropTypes from 'prop-types';
import useFormField from '../../hooks/useFormField';

/**
 * Renders a date field for editing attribute end date.
 *
 * A subcomponent of AttributeEditor.
 */
const EndDateField = ({ path, value, onChange, label, helperText }) => {
  const { t } = useTranslation();
  const { validationSchema } = useForm();
  const { fieldPath, errors, props } = useFormField({
    path,
    name: 'endDate',
    onChange,
  });

  const endDateFieldProps = {
    ...props,
    label: label || t('attribute.validUntil'),
    helperText: <HelperText helperText={helperText} errors={errors} />,
    fullWidth: true,
    minDate: getMinEndDate(validationSchema, fieldPath, value),
    maxDate: getMax(validationSchema, fieldPath),
  };

  return <DateField {...endDateFieldProps} />;
};

EndDateField.propTypes = {
  /** The path in form values where to look for validation schema and errors */
  path: PropTypes.string.isRequired,

  /** Object containing attribute value, start date and end date */
  value: PropTypes.object.isRequired,

  /** Called when the value changes, taking the new value as the first argument */
  onChange: PropTypes.func.isRequired,

  /** Label of the date field */
  label: PropTypes.string,

  /**
   * Helper text displayed below the field.
   */
  helperText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default EndDateField;
