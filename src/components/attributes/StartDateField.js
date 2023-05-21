import React from 'react';
import useForm from '../../hooks/useForm';
import DateField from '../inputs/DateField';
import HelperText from '../inputs/HelperText';
import { useTranslation } from 'react-i18next';
import { getMaxStartDate, getMin } from '../../utils/validationUtils';
import PropTypes from 'prop-types';
import useFormField from '../../hooks/useFormField';

/**
 * Renders a date field for editing attribute start date.
 *
 * A subcomponent of AttributeEditor.
 */
const StartDateField = ({ path, onChange, label, helperText }) => {
  const { t } = useTranslation();
  const { validationSchema } = useForm();
  const { fieldPath, errors, props } = useFormField({
    path,
    name: 'startDate',
    onChange,
  });

  const startDateFieldProps = {
    ...props,
    label: label || t('attribute.validFrom'),
    helperText: <HelperText helperText={helperText} errors={errors} />,
    fullWidth: true,
    minDate: getMin(validationSchema, fieldPath),
    maxDate: getMaxStartDate(validationSchema, fieldPath, props.value),
  };

  return <DateField {...startDateFieldProps} />;
};

StartDateField.propTypes = {
  /** The path in form values where to look for validation schema and errors */
  path: PropTypes.string.isRequired,

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

export default StartDateField;
