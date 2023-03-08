import * as React from 'react';
import { changeDate } from '../actions/dayChangeAction';
import { connect } from 'react-redux';
import { isValid } from 'date-fns';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import DateField from './DateField';
import Stack from '@mui/material/Stack';

const ReviewDate = (props) => {
  const { t, i18n } = useTranslation();
  const changeToCurrentDate = () => {
    const date = new Date();
    props.onDayChange(date);
  };

  return (
    <Stack direction="row" gap={2} alignItems="center">
      <DateField
        label={t('display_date')}
        value={props.selectedDay ? props.selectedDay : new Date()}
        onChange={(newDate) => props.onDayChange(newDate)}
      />
      <Button onClick={changeToCurrentDate} variant="outlined">
        {t('return_to_today')}
      </Button>
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  selectedDay: state.dr.selectedDay,
});

const mapDispatchToProps = (dispatch) => ({
  onDayChange: (date) => {
    isValid(date)
      ? dispatch(changeDate(new Date(date).toLocaleDateString('fi-FI')))
      : '';
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDate);
