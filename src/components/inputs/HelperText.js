import React from 'react';
import PropTypes from 'prop-types';

const mapLines = (lines) =>
  lines.map((line, index) => (
    <React.Fragment key={`${index}-${line}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </React.Fragment>
  ));

/**
 * Helper text component to be used with MUI TextField helperText prop.
 *
 * Displays errors or a normal helper text. Errors take precedence, so
 * the normal helper text is hidden when errors are present.
 *
 * Both texts can be either one string or an array of strings.
 * When the array contains multiple texts, each text is displayed on separate
 * line.
 */
const HelperText = ({ helperText, errors }) => {
  if (Array.isArray(errors) && errors.length > 0) {
    return mapLines(errors);
  } else if (typeof errors === 'string' && errors !== '') {
    return errors;
  } else if (Array.isArray(helperText) && helperText.length > 0) {
    return mapLines(helperText);
  } else if (typeof helperText === 'string' && helperText !== '') {
    return helperText;
  } else {
    // The space makes sure that the height is always at least one line so that
    // all fields have consistent height whether there is a helper text or not
    return <span aria-hidden="true">&#8203;</span>;
  }
};

HelperText.propTypes = {
  /** Displayed when there are no errors */
  helperText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /** Displayed in place of helper text if present */
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default HelperText;
