import React, { useState, useEffect, Fragment } from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';

const PickDate = () => {
    const { t } = useTranslation();

    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
    }, []);

    const changeDate = (date) => {
        setSelectedDate(date);
    };

    return (
            <div>
                <DatePicker wrapperClassName="datePicker" locale="fi" dateFormat="dd.MM.yyyy" className="form-control"
                          selected={selectedDate}
                          onChange={(date) =>  {
                                changeDate(date);
                            }} />
            </div>
    );
};

export default PickDate;
