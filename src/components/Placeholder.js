import Typography from '@mui/material/Typography';
import React from 'react';

/**
 * Displays a placeholder text if empty is true, otherwise the content.
 *
 * @param empty
 * @param placeholder placeholder text to display
 * @param align text-align of the placeholder
 * @param children displayed if empty is false
 * @param props other props passed to placeholder Typography
 */
const Placeholder = ({
  empty,
  placeholder,
  align = 'center',
  children,
  ...props
}) => {
  if (!empty) {
    return children;
  }

  return (
    <Typography variant="body1" color="text.secondary" align={align} {...props}>
      {placeholder}
    </Typography>
  );
};

export default Placeholder;
