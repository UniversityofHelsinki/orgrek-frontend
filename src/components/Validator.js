import moment from 'moment';

export const validateDates = (modidiedAttributes) => {
    let errors = false;
    if (modidiedAttributes) {
        modidiedAttributes.forEach(modified => {
            //console.log('start:' + modified.startDate);
            //console.log('end:' + modified.endDate);
            let startD = moment(modified.startDate).valueOf();
            let endD = moment(modified.endDate).valueOf();
            if (startD > endD) {
                modified.err = 'startdata_after_enddata';
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
