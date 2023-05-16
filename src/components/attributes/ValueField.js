import React from 'react';
import useForm from '../../hooks/useForm';
import HelperText from '../inputs/HelperText';
import TextField from '../inputs/TextField';
import { getErrors, getMax, isRequired } from '../../utils/validationUtils';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * Renders a text field for editing attribute value.
 *
 * A subcomponent of AttributeEditor.
 */
const ValueField = ({ label, path, value, onChange, renderValueField }) => {
  const { t } = useTranslation();
  const { errors, validationSchema } = useForm();

  const valuePath = `${path}.value`;
  const valueErrors = getErrors(errors, valuePath);

  const handleValueChange = (event) => {
    const newValue = event.target.value;

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

  const valueFieldProps = {
    label: label || t('value'),
    value: value.value || '',
    onChange: handleValueChange,
    fullWidth: true,
    required: isRequired(validationSchema, valuePath),
    error: valueErrors.length > 0,
    helperText: <HelperText errors={valueErrors} />,
    inputProps: { maxLength: getMax(validationSchema, valuePath) },
    onBlur: handleLeavingFocus,
  };

  if (renderValueField) {
    return renderValueField(valueFieldProps);
  }

  return (
    <TextField data-testid="attributeValueTextField" {...valueFieldProps} />
  );
};

ValueField.propTypes = {
  /** Label of the value text field */
  label: PropTypes.string,

  /** The path in form values where to look for validation schema and errors */
  path: PropTypes.string.isRequired,

  /** Attribute value with start and end dates */
  value: PropTypes.shape({
    /** Must be unique on every row */
    id: PropTypes.number.isRequired,

    /** Attribute value */
    value: PropTypes.any,

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

  /**
   * Allows customizing how the value field is rendered.
   *
   * The first argument of this function contains default props that should be
   * passed to TextField
   */
  renderValueField: PropTypes.func,
};

export default ValueField;
