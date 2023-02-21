import * as React from 'react';
import { changeDate } from '../actions/dayChangeAction';
import { connect } from 'react-redux';
import { isValid } from 'date-fns';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import DateInput from './DateInput';

const ReviewDate = (props) => {
  const { t, i18n } = useTranslation();
  const changeToCurrentDate = () => {
    const date = new Date();
    props.onDayChange(date);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <DateInput
            label={t('display_date')}
            value={props.selectedDay ? props.selectedDay : new Date()}
            onChange={(newDate) => props.onDayChange(newDate)}
          />
        </Grid>
        <Grid xs={4} mt={1}>
          <Button onClick={changeToCurrentDate} variant="contained">
            {t('return_to_today')}
          </Button>
        </Grid>
      </Grid>
    </Box>
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
