export const showValidity = (startDate, endDate, i18n) => {
    console.log(i18n);
    if (startDate && endDate) {
        return new Date(startDate).toLocaleDateString('fi-FI') + ' – ' + new Date(endDate).toLocaleDateString('fi-FI');
    }
    if (startDate) {
        return i18n ? i18n.t('from_date') : '' + new Date(startDate).toLocaleDateString('fi-FI');
    }

    if (endDate) {
        return i18n ? i18n.t('until_date') : ''  +  new Date(endDate).toLocaleDateString('fi-FI');
    }

    return i18n ? i18n.t('not_specified') : '';
};

export default showValidity;
