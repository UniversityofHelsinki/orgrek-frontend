import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import classNames from 'classnames';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '../icons/Replay';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders actions for a deleted AttributeEditorRow.
 */
const DeletedAttributeRowActions = ({ onUndoDelete, valueDescription, sx }) => {
  const { t } = useTranslation();

  return (
    <Box className={classNames('actions')} sx={sx}>
      <Tooltip title={t('attribute.undoDelete')}>
        <IconButton
          data-testid="attributeRowUndoDeleteButton"
          onClick={onUndoDelete}
          aria-label={`${t('attribute.undoDelete')} ${valueDescription}`}
        >
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

DeletedAttributeRowActions.propTypes = {
  /** Callback called when undo delete button is clicked */
  onUndoDelete: PropTypes.func.isRequired,

  /**
   * Value description for aria-label.
   * It should distinguish this value from other values of the same attribute.
   */
  valueDescription: PropTypes.string.isRequired,
};

export default DeletedAttributeRowActions;
