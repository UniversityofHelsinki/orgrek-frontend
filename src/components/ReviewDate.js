import * as React from 'react';
import { changeDate } from '../actions/dayChangeAction';
import { connect } from 'react-redux';
import { isValid } from 'date-fns';
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
        size="small"
        label={t('display_date')}
        value={props.selectedDay ? props.selectedDay : new Date()}
        onChange={(newDate) => props.onDayChange(toDate(newDate))}
        componentsProps={{
          actionBar: { actions: ['today'] },
        }}
      />
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
