import React from 'react';
import MuiButton from '@mui/material/Button';
import Spinner from './Spinner';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * MUI Button extended with a custom loading indicator.
 */
const Button = ({
  children,
  startIcon,
  loading,
  disabled,
  loadingText,
  ...props
}) => {
  const { t } = useTranslation();

  let spinner;
  let loadingContent;
  if (loading) {
    spinner = <Spinner color="inherit" sx={{ fontSize: 18 }} />;
    loadingContent = loadingText || t('loading');
  }

  return (
    <MuiButton
      startIcon={spinner || startIcon}
      disabled={disabled || loading}
      {...props}
    >
      {loadingContent || children}
    </MuiButton>
  );
};

Button.propTypes = {
  /** Disables the button and displays a spinner */
  loading: PropTypes.bool,

  /** Customize the text displayed when loading */
  loadingText: PropTypes.string,
};

export default Button;
