import * as React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { changeDate } from '../actions/dayChangeAction';
import { connect } from 'react-redux';
import { isValid } from 'date-fns';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Unstable_Grid2';
import LanguageSelect from './LanguageSelect';
import Box from '@mui/material/Box';

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
          <DatePicker
            value={props.selectedDay ? props.selectedDay : new Date()}
            onChange={(newDate) => props.onDayChange(newDate)}
            renderInput={(params) => <TextField {...params} />}
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
