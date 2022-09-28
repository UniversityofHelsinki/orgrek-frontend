import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
registerLocale('fi', fi);

const ChooseDate = (props) => {
    const { t, i18n } = useTranslation();

    const emptydate = {
        date: undefined
    };

    return (
        <Fragment>
            {props.field === 'startDate' ?
            <Col xs={6}>
                <DatePicker wrapperClassName="datePicker"  locale="fi" dateFormat="dd.MM.yyyy" className="form-control"
                            selected={props.elem.startDate === null ? emptydate.date : new Date(props.elem.startDate)}
                            onChange={(e) => props.onDateChange({ date:e, whichDate:'startDate', elem:props.elem, validity:props.validity })}
                            />
            </Col>
            :
            <Col xs={6}>
                <DatePicker wrapperClassName="datePicker"  locale="fi" dateFormat="dd.MM.yyyy" className="form-control"
                            selected={props.elem.endDate === null ? emptydate.date : new Date(props.elem.endDate)}
                            onChange={(e) => props.onDateChange({ date:e, whichDate:'endDate', elem:props.elem, validity: props.validity })}
                />
            </Col>}
        </Fragment>
    );
};
export default connect()(ChooseDate);

