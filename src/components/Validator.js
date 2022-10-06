import moment from 'moment';

export const validateDates = (modifiedAttributes) => {
    let errors = false;
    if (modifiedAttributes) {
        modifiedAttributes.forEach(modified => {
            let startD = moment(modified.startDate).valueOf();
            let endD = moment(modified.endDate).valueOf();
            if (startD > endD) {
                modified.err = 'startdate_after_enddate';
                errors = true;
            }
        });
    }
    return errors;
};

export const validateValues = (modidiedAttributes) => {
    let errors = false;
    if (modidiedAttributes) {
        modidiedAttributes.forEach(modified => {
            if (modified.value === '') {
                modified.err = 'empty_value';
                errors = true;
            }
        });
    }
    return errors;
};
