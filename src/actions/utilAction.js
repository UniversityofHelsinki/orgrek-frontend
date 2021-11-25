export const showValidity = (startDate, endDate, i18n, t) => {
    const lang = i18n.language;
    if (startDate && endDate) {
        return new Date(startDate).toLocaleDateString('fi-FI') + ' – ' + new Date(endDate).toLocaleDateString('fi-FI');
    }
    if (startDate) {
        switch (lang) {
            case 'fi':
                return new Date(startDate).toLocaleDateString('fi-FI') + t('from_date');

            default:
                return t('from_date') + new Date(startDate).toLocaleDateString('fi-FI');
        }
    }

    if (endDate) {
        switch (lang) {
            case 'fi':
                return new Date(startDate).toLocaleDateString('fi-FI') + t('until_date');

            default:
                return t('until_date') + new Date(startDate).toLocaleDateString('fi-FI');
        }
    }

    return t('not_specified');
};

export const commaSep = (hierarchies) => {
    return hierarchies.map(item => item).join(', ');
};

export const parseDisplayNames = (nameInfoData, lyhenne, emo_lyhenne) => {
    const displayNames = nameInfoData.map((elem) => {
        const emo = emo_lyhenne && emo_lyhenne.value ? '(' + emo_lyhenne.value + '), ' : '';
        const name = elem && elem.value ? elem.value : '';
        const abbr = lyhenne && lyhenne.value ? ' (' + lyhenne.value + ')' : '';
        return {
            'key': elem.key,
            'value': emo + name + abbr,
            'startDate': elem.startDate,
            'endDate': elem.endDate
        };
    });

    return displayNames;
};
