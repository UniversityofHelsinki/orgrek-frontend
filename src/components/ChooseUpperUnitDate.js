import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
registerLocale('fi', fi);

const ChooseUpperUnitDate = (props) => {
    const { t, i18n } = useTranslation();

    const emptydate = {
        date: undefined
    };

    return (
        <Fragment>
            {props.field === 'startDate' ?
                <Col xs={6}>
                    <DatePicker wrapperClassName="datePicker"  locale="fi" dateFormat="dd.MM.yyyy" className="form-control"
                                selected={props.hierarchyElement.startDate === null ? emptydate.date : new Date(props.hierarchyElement.startDate)}
                                onChange={(e) => props.onDateChange({ date:e, whichDate:'startDate', elem:props.elem, hierarchy:props.hierarchyElement.hierarchy })}
                    />
                </Col>
                :
                <Col xs={6}>
                    <DatePicker wrapperClassName="datePicker"  locale="fi" dateFormat="dd.MM.yyyy" className="form-control"
                                selected={props.hierarchyElement.endDate === null ? emptydate.date : new Date(props.hierarchyElement.endDate)}
                                onChange={(e) => props.onDateChange({ date:e, whichDate:'endDate', elem:props.elem, hierarchy:props.hierarchyElement.hierarchy })}
                    />
                </Col>
            }
        </Fragment>
    );
};
export default connect()(ChooseUpperUnitDate);

