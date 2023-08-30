import React from 'react';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '../inputs/Button';
import PlusIcon from '../icons/Plus';
import SearchIcon from '../icons/Search';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import IfAuthorized from '../../auth/IfAuthorized';

/**
 * Customized toolbar for MUI X DataGrid.
 */
const GridToolbar = ({ onAddRow, authActions }) => {
  const { t } = useTranslation();

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Box sx={{ flex: 1 }} />
      <IfAuthorized action={authActions.edit}>
        <Button
          variant="text"
          size="small"
          startIcon={<PlusIcon />}
          onClick={onAddRow}
          sx={{ mr: 2 }}
        >
          {t('dataGrid.addRow')}
        </Button>
      </IfAuthorized>
      <GridToolbarQuickFilter
        variant="outlined"
        size="small"
        debounceMs={500}
        InputProps={{
          startAdornment: undefined,
          endAdornment: <SearchIcon fontSize="small" color="primary" />,
        }}
      />
    </GridToolbarContainer>
  );
};

GridToolbar.propTypes = {
  /** Called when add row button is clicked */
  onAddRow: PropTypes.func.isRequired,

  /**
   * Defines which actions are used for checking authorization. Pass the
   * appropriate object from auth.js.
   */
  authActions: PropTypes.shape({
    edit: PropTypes.object.isRequired,
  }).isRequired,
};

export default GridToolbar;
