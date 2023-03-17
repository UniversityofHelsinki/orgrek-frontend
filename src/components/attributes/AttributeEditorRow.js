import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '../TextField';
import DateField from '../DateField';
import classNames from 'classnames';
import IconButton from '@mui/material/IconButton';
import SlimHamburgerMenuIcon from '../icons/SlimHamburgerMenu';
import ReplayIcon from '../icons/Replay';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import { showValidity } from '../../actions/utilAction';
import { Tooltip } from '@mui/material';
import Grow from '@mui/material/Grow';
import DeletedAttributeRow from './DeletedAttributeRow';

/**
 * Edits a single attribute value with a start date and an end date.
 *
 * By default, uses TextField for editing the value but this can be customized
 * by passing a custom render function as renderValueField prop.
 */
const AttributeEditorRow = ({
  valueLabel,
  value,
  onChange,
  onInsertBefore,
  onInsertAfter,
  renderValueField,
  getDisplayText,
}) => {
  const { t, i18n } = useTranslation();
  const [valueError, setValueError] = useState(null);
  const [startDateError, setStartDateError] = useState(null);
  const [errorInStartDate, setErrorInStartDate] = useState(null);
  const [endDateError, setEndDateError] = useState(null);
  const [errorInEndDate, setErrorInEndDate] = useState(null);
  const [menuAnchorRef, setMenuAnchorRef] = useState(null);
  const menuOpen = Boolean(menuAnchorRef);

  // True after user has interacted with the row
  const [touched, setTouched] = useState(false);

  const handleMenuButtonClick = (event) => {
    setMenuAnchorRef(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorRef(null);
  };

  const handleValueChange = (event) => {
    const newValue = event.target.value;

    if (!newValue) {
      setValueError(t('attribute.required'));
    } else {
      setValueError(null);
    }

    onChange({
      ...value,
      value: newValue,
    });
  };

  const handleDateStartChange = (date) => {
    if (date !== null && !isValid(date)) {
      setStartDateError(t('invalidDate'));
      setErrorInStartDate(true);

      onChange({
        ...value,
        startDate: 'invalid date',
      });

      return;
    }

    setStartDateError(null);
    setErrorInStartDate(false);

    onChange({
      ...value,
      startDate: date && format(date, 'yyyy-MM-dd'),
    });
  };

  const handleDateEndChange = (date) => {
    if (date !== null && !isValid(date)) {
      setEndDateError(t('invalidDate'));
      setErrorInEndDate(true);

      onChange({
        ...value,
        endDate: 'invalid date',
      });

      return;
    }

    setEndDateError(null);
    setErrorInEndDate(false);

    onChange({
      ...value,
      endDate: date && format(date, 'yyyy-MM-dd'),
    });
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
    setTouched(true);
    onChange({
      ...value,
      deleted: true,
    });
  };

  const handleUndoDelete = () => {
    setTouched(true);
    onChange({
      ...value,
      deleted: false,
    });
  };

  const valueFieldProps = {
    label: valueLabel || t('value'),
    value: value.value || '',
    onChange: handleValueChange,
    fullWidth: true,
    required: true,
    error: Boolean(valueError),
    helperText: valueError || ' ',
    inputProps: { maxLength: 250 },
  };

  const renderedValueField = renderValueField ? (
    renderValueField(valueFieldProps)
  ) : (
    <TextField data-testid="attributeValueTextField" {...valueFieldProps} />
  );

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const renderedStartDateField = (
    <DateField
      label={t('attribute.validFrom')}
      margin="normal"
      value={value.startDate}
      onChange={handleDateStartChange}
      maxDate={value.endDate !== null ? addDays(value.endDate, -2) : null}
      fullWidth
      onError={(reason, value) => {
        if (reason) {
          //setStartDateError(t('reason')); Kommenteissa, että näkee virheen "nimen",
          //joka lisätään käännösteksteihin. Tämä koodirivi otetaan käyttöön kun pääsee lisäämään
          //käännöstekstin. Samalla alla oleva rivi poistetaan.
          setStartDateError(reason);
          setErrorInStartDate(true);
        } else {
          setStartDateError(null);
          setErrorInStartDate(false);
        }
      }}
      error={errorInStartDate}
      helperText={startDateError || ' '}
    />
  );

  const renderedEndDateField = (
    <DateField
      label={t('attribute.validUntil')}
      fullWidth
      value={value.endDate}
      onChange={handleDateEndChange}
      minDate={value.startDate !== null ? addDays(value.startDate, 2) : null}
      onError={(reason, value) => {
        if (reason) {
          //setEndDateError(t('reason')); Kommenteissa, että näkee virheen "nimen",
          //joka lisätään käännösteksteihin. Tämä koodirivi otetaan käyttöön kun pääsee lisäämään
          //käännöstekstin. Samalla alla oleva rivi poistetaan.
          setEndDateError(reason);
          setErrorInEndDate(true);
        } else {
          setEndDateError(null);
          setErrorInEndDate(false);
        }
      }}
      error={errorInEndDate}
      helperText={endDateError || ' '}
    />
  );

  let valueDescriptions = [];

  if (!valueError && value.value) {
    valueDescriptions.push(
      getDisplayText ? getDisplayText(value) : value.value
    );
  }

  if (!startDateError && !endDateError) {
    valueDescriptions.push(
      showValidity(value.startDate, value.endDate, i18n, t)
    );
  }

  const valueDescription = valueDescriptions.join(', ');

  let renderedRow;
  let renderedActions;

  if (value.deleted) {
    renderedRow = (
      <Grid xs={12}>
        <DeletedAttributeRow value={value} getDisplayText={getDisplayText} />
      </Grid>
    );

    renderedActions = (
      <Box pt={1} className={classNames('actions')}>
        <Tooltip title={t('attribute.undoDelete')}>
          <IconButton
            data-testid="attributeRowUndoDeleteButton"
            onClick={handleUndoDelete}
            aria-label={`${t('attribute.undoDelete')} ${valueDescription}`}
          >
            <ReplayIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  } else {
    renderedRow = (
      <>
        <Grid xs={12} sm={12} md={6}>
          {renderedValueField}
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          {renderedStartDateField}
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          {renderedEndDateField}
        </Grid>
      </>
    );

    renderedActions = (
      <Box pt={1} className={classNames('actions', { menuOpen })}>
        <Tooltip title={t('attribute.actions')}>
          <IconButton
            data-testid="attributeRowMenuButton"
            onClick={handleMenuButtonClick}
            aria-label={`${t('attribute.actions')} ${valueDescription}`}
          >
            <SlimHamburgerMenuIcon />
          </IconButton>
        </Tooltip>
        <Menu
          open={menuOpen}
          anchorEl={menuAnchorRef}
          onClose={handleMenuClose}
        >
          <MenuItem
            data-testid="insertBeforeMenuItem"
            onClick={handleInsertBefore}
          >
            {t('attribute.insertBefore')}
          </MenuItem>
          <MenuItem
            data-testid="insertAfterMenuItem"
            onClick={handleInsertAfter}
          >
            {t('attribute.insertAfter')}
          </MenuItem>
          <MenuItem data-testid="deleteRowMenuItem" onClick={handleDelete}>
            {t('attribute.deleteRow')}
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        '&:last-of-type': {
          marginBottom: 0,
        },
        '.actions': {
          // Apply hover effect to actions only in desktop
          opacity: { xs: 1, md: 0 },
        },
        ':hover .actions, :focus-within .actions, .actions.menuOpen': {
          opacity: 1,
        },
      }}
    >
      <Stack direction="row" spacing={1}>
        <Grow in appear={value.isNew || touched} key={value.deleted}>
          <Grid flex="auto" container xs={11} rowSpacing={2} columnSpacing={2}>
            {renderedRow}
          </Grid>
        </Grow>
        {renderedActions}
      </Stack>
    </Box>
  );
};

AttributeEditorRow.propTypes = {
  /** Label of the value text field */
  valueLabel: PropTypes.string,

  /** Attribute value with start and end dates */
  value: PropTypes.shape({
    /** Must be unique on every row */
    id: PropTypes.number.isRequired,

    /** Attribute value */
    value: PropTypes.string,

    /** Validity start date, ISO 8601 date string without time component */
    startDate: PropTypes.string,

    /** Validity end date, ISO 8601 date string without time component */
    endDate: PropTypes.string,

    /* True if the row has not yet been saved to database */
    isNew: PropTypes.bool.isRequired,

    /** Soft deletion marker so that it can be reverted */
    deleted: PropTypes.bool.isRequired,
  }).isRequired,

  /** Called when the value changes, taking the new value as the first argument */
  onChange: PropTypes.func.isRequired,

  /** Called when 'insert row before' action is clicked */
  onInsertBefore: PropTypes.func.isRequired,

  /** Called when 'insert row after' action is clicked */
  onInsertAfter: PropTypes.func.isRequired,

  /**
   * Allows customizing how the value field is rendered.
   *
   * The first argument of this function contains default props that should be
   * passed to TextField
   */
  renderValueField: PropTypes.func,

  /**
   * Specifies how the value should be displayed in view mode and a11y
   * description.
   *
   * Takes an attribute object as the first arg and returns the display text as
   * string.
   */
  getDisplayText: PropTypes.func,
};

export default AttributeEditorRow;
