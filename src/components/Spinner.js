import React from 'react';
import SpinnerIcon from './icons/Spinner';
import PropTypes from 'prop-types';

/**
 * Animated rotating spinner.
 */
const Spinner = ({ color, sx }) => {
  return (
    <SpinnerIcon
      sx={[
        {
          color: color || 'primary.main',
          animation: 'spin 1.5s linear infinite',
          '@keyframes spin': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
};

Spinner.propTypes = {
  /**
   * Customize spinner color (defaults to primary).
   *
   * Supports theme variables which is the preferred method for defining colors.
   */
  color: PropTypes.string,
};

export default Spinner;
