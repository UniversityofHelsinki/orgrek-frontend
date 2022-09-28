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
                modified.err = 'Loppupäivä ennen alkupäivää';
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
                modified.err = 'Arvo tyhjä';
                errors = true;
            }
        });
    }
    return errors;
};
