export const showValidity = (startDate, endDate) => {
    if (startDate && endDate) {
        return new Date(startDate).toLocaleDateString('fi-FI') + ' – ' + new Date(endDate).toLocaleDateString('fi-FI');
    }
    if (startDate) {
        return 'from_date ' + new Date(startDate).toLocaleDateString('fi-FI');
    }

    if (endDate) {
        return 'until_date ' +  new Date(endDate).toLocaleDateString('fi-FI');
    }

    return 'not_specified';
};
