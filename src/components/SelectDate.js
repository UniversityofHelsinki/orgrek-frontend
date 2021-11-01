import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { changeDate } from '../actions/dayChangeAction';


import fi from 'date-fns/locale/fi';
registerLocale('fi', fi);

const SelectDate = (props) => {

    React.useEffect(() => {
    }, [props.selectedDay]);

    return (
        <Fragment>
            <DatePicker locale="fi" dateFormat="dd.MM.yyyy" className="form-control"  selected={props.selectedDay} onChange={(date) =>  props.onDayChange(date)} />
        </Fragment>
    );
};

const mapStateToProps = state => ({
    selectedDay : state.dr.selectedDay
});

const mapDispatchToProps = dispatch => ({
    onDayChange: (day) => dispatch(changeDate(day))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDate);

