import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DashedBorder from '../DashedBorder';
import { useTranslation } from 'react-i18next';
import { showValidity } from '../../actions/utilAction';

const DeletedAttributeRow = React.forwardRef(function DeletedAttributeRow(
  { value },
  ref
) {
  const { t, i18n } = useTranslation();

  const hasValidity = value.startDate || value.endDate;
  const validity = showValidity(
    value.startDate,
    value.endDate,
    i18n,
    t
  ).toLowerCase();

  return (
    <Box pb="18px" ref={ref}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          position: 'relative',
          padding: 1.5,
          height: 56,
        }}
      >
        <DashedBorder />
        <Typography color="text.secondary">
          {t(
            hasValidity ? 'attribute.deleted' : 'attribute.deletedNoValidity',
            {
              value: value.value || t('attribute.empty'),
              validity,
            }
          )}
        </Typography>
      </Stack>
    </Box>
  );
});

export default DeletedAttributeRow;
