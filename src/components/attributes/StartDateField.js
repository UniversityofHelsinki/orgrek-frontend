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
const StartDateField = ({ path, label, helperText }) => {
  const { t } = useTranslation();
  const { validationSchema, getValue } = useForm();
  const { fieldPath, errors, props } = useFormField({
    path,
    name: 'startDate',
  });

  const attributeValue = getValue(path);

  const startDateFieldProps = {
    ...props,
    label: label || t('attribute.validFrom'),
    helperText: <HelperText helperText={helperText} errors={errors} />,
    fullWidth: true,
    minDate: getMin(validationSchema, fieldPath),
    maxDate: getMaxStartDate(validationSchema, fieldPath, attributeValue),
  };

  return <DateField {...startDateFieldProps} />;
};

StartDateField.propTypes = {
  /** The path in form values where to look for validation schema and errors */
  path: PropTypes.string.isRequired,

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
