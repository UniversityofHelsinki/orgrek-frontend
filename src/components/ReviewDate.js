import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import { changeDate } from '../actions/dayChangeAction';
import { connect } from 'react-redux';
import { isValid } from 'date-fns';

const ReviewDate = (props) => {
  return (
    <Stack spacing={3}>
      <DatePicker
        value={props.selectedDay ? props.selectedDay : new Date()}
        onChange={(newDate) => props.onDayChange(newDate)}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  selectedDay: state.dr.selectedDay,
});

const mapDispatchToProps = (dispatch) => ({
  onDayChange: (date) => {
    isValid(date) ? dispatch(changeDate(new Date(date))) : '';
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDate);
