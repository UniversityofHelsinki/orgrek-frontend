import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DashedBorder from '../DashedBorder';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { showValidity } from '../../utils/showValidity';

/**
 * Renders a placeholder for a deleted attribute value.
 */
const DeletedAttributeRow = React.forwardRef(function DeletedAttributeRow(
  { value, getDisplayText },
  ref
) {
  const { t } = useTranslation();

  let displayText;
  if (!value.value) {
    displayText = t('attribute.empty');
  } else if (getDisplayText) {
    displayText = getDisplayText(value);
  } else {
    displayText = value.value;
  }

  const hasValidity = value.startDate || value.endDate;
  const validity = showValidity(value.startDate, value.endDate).toLowerCase();

  return (
    <Box pb="18px" ref={ref} data-testid="deletedAttributeRow">
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          position: 'relative',
          padding: 1.5,
          minHeight: 56,
        }}
      >
        <DashedBorder />
        <Typography color="text.secondary">
          {t(
            hasValidity ? 'attribute.deleted' : 'attribute.deletedNoValidity',
            {
              value: displayText,
              validity,
            }
          )}
        </Typography>
      </Stack>
    </Box>
  );
});

DeletedAttributeRow.propTypes = {
  /** Attribute value with start and end dates */
  value: PropTypes.shape({
    /** Attribute value */
    value: PropTypes.string,

    /** Validity start date, ISO 8601 date string without time component */
    startDate: PropTypes.string,

    /** Validity end date, ISO 8601 date string without time component */
    endDate: PropTypes.string,
  }).isRequired,

  /**
   * Specifies how the value should be displayed.
   *
   * Takes an attribute object as the first arg and returns the display text as
   * string.
   */
  getDisplayText: PropTypes.func,
};

export default DeletedAttributeRow;
