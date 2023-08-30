import React from 'react';
import HelperText from '../inputs/HelperText';
import TextField from '../inputs/TextField';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import useTextField from '../../hooks/useTextField';

/**
 * Renders a text field for editing attribute value.
 *
 * A subcomponent of AttributeEditor.
 */
const ValueField = ({
  label,
  path,
  name = 'value',
  helperText,
  renderValueField,
  focusRef,
}) => {
  const { t } = useTranslation();
  const { errors, props } = useTextField({ path, name });

  const valueFieldProps = {
    ...props,
    label: label || t('value'),
    helperText: <HelperText helperText={helperText} errors={errors} />,
    fullWidth: true,
  };

  if (renderValueField) {
    return renderValueField(valueFieldProps);
  }

  return <TextField {...valueFieldProps} ref={focusRef} />;
};

ValueField.propTypes = {
  /** Label of the value text field */
  label: PropTypes.string,

  /**
   * Helper text displayed below the field.
   */
  helperText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /** The path in form values where to look for validation schema and errors */
  path: PropTypes.string.isRequired,

  /** name of the property inside the object defined by the path, defaults to 'value' */
  name: PropTypes.string,

  /**
   * Allows customizing how the value field is rendered.
   *
   * The first argument of this function contains default props that should be
   * passed to TextField
   *
   * @deprecated use useTextField hook instead
   */
  renderValueField: PropTypes.func,
};

export default ValueField;
