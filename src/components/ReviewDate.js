import * as React from 'react';
import { changeDate } from '../actions/dayChangeAction';
import { connect } from 'react-redux';
import { isValid } from 'date-fns';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import DateField from './inputs/DateField';
import Stack from '@mui/material/Stack';
import { toDate } from '../utils/dateUtils';

const ReviewDate = (props) => {
  const { t } = useTranslation();
  const changeToCurrentDate = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    props.onDayChange(date);
  };

  return (
    <Stack direction="row" gap={2} alignItems="center">
      <DateField
        label={t('display_date')}
        value={props.selectedDay ? props.selectedDay : new Date()}
        onChange={(newDate) => props.onDayChange(toDate(newDate))}
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
    if (isValid(date)) {
      dispatch(changeDate(new Date(date)));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDate);
