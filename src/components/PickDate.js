import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';

const PickDate = (props) => {
    const { t } = useTranslation();

    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (!props.selectedStartDate && !props.selectedEndDate) {
            setSelectedDate(null);
        }
    }, [props.selectedStartDate, props.selectedEndDate]);

    const changeDate = (date, startDate, endDate) => {
        setSelectedDate(date);
        props.onDateChange(date, startDate, endDate);
    };

    return (
            <div>
                <DatePicker wrapperClassName="datePicker" locale="fi" dateFormat="dd.MM.yyyy" className="form-control"
                          selected={selectedDate}
                          onChange={(date) =>  {
                                changeDate(date, props.startDate, props.endDate);
                            }} />
            </div>
    );
};

export default PickDate;
