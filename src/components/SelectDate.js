import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import { changeDate } from '../actions/dayChangeAction';


import fi from 'date-fns/locale/fi';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
registerLocale('fi', fi);

const SelectDate = (props) => {

    const { t, i18n } = useTranslation();

    React.useEffect(() => {
    }, [props.selectedDay]);


    const changeToCurrentDate = () =>  {
        const date = new Date();
        props.onDayChange(date);
        i18n.loadNamespaces('nodeattr' + date.toLocaleDateString('EN-CA'));
    };

    return (
        <Fragment>
            <DatePicker wrapperClassName="datePicker" locale="fi" dateFormat="dd.MM.yyyy" className="form-control"
                        selected={props.selectedDay ? props.selectedDay : new Date()}
                        onChange={(date) =>  {
                            props.onDayChange(date);
                            i18n.loadNamespaces('nodeattr' + date.toLocaleDateString('EN-CA'));
                        }} />
            <Button className="returnTodayButton" onClick={changeToCurrentDate}>{t('return_to_today')}</Button>
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

