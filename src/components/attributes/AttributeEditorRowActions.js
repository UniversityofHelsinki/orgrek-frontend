import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import classNames from 'classnames';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SlimHamburgerMenuIcon from '../icons/SlimHamburgerMenu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';

/**
 * Renders the actions menu for AttributeEditorRow.
 */
const AttributeEditorRowActions = ({
  valueDescription,
  onInsertAfter,
  onInsertBefore,
  onDelete,
  sx,
}) => {
  const { t } = useTranslation();
  const [menuAnchorRef, setMenuAnchorRef] = useState(null);
  const menuOpen = Boolean(menuAnchorRef);

  const handleMenuButtonClick = (event) => {
    setMenuAnchorRef(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorRef(null);
  };

  const handleInsertAfter = () => {
    handleMenuClose();
    onInsertAfter();
  };

  const handleInsertBefore = () => {
    handleMenuClose();
    onInsertBefore();
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete();
  };

  return (
    <Box className={classNames('actions', { menuOpen })} sx={sx}>
      <Tooltip title={t('attribute.actions')}>
        <IconButton
          data-testid="attributeRowMenuButton"
          onClick={handleMenuButtonClick}
          aria-label={`${t('attribute.actions')} ${valueDescription}`}
        >
          <SlimHamburgerMenuIcon />
        </IconButton>
      </Tooltip>
      <Menu open={menuOpen} anchorEl={menuAnchorRef} onClose={handleMenuClose}>
        <MenuItem
          data-testid="insertBeforeMenuItem"
          onClick={handleInsertBefore}
        >
          {t('attribute.insertBefore')}
        </MenuItem>
        <MenuItem data-testid="insertAfterMenuItem" onClick={handleInsertAfter}>
          {t('attribute.insertAfter')}
        </MenuItem>
        <MenuItem data-testid="deleteRowMenuItem" onClick={handleDelete}>
          {t('attribute.deleteRow')}
        </MenuItem>
      </Menu>
    </Box>
  );
};

AttributeEditorRowActions.propTypes = {
  /** Callback called when insert row after is clicked */
  onInsertAfter: PropTypes.func.isRequired,

  /** Callback called when insert row before is clicked */
  onInsertBefore: PropTypes.func.isRequired,

  /** Callback called when delete row is clicked */
  onDelete: PropTypes.func.isRequired,

  /**
   * Value description for aria-label.
   * It should distinguish this value from other values of the same attribute.
   */
  valueDescription: PropTypes.string.isRequired,
};

export default AttributeEditorRowActions;
