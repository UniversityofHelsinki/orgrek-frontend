export const showValidity = (startDate, endDate, i18n, t) => {
    const lang = i18n.language;
    if (startDate && endDate) {
        return new Date(startDate).toLocaleDateString('fi-FI') + ' - ' + new Date(endDate).toLocaleDateString('fi-FI');
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
                return new Date(endDate).toLocaleDateString('fi-FI') + t('until_date');

            default:
                return t('until_date') + new Date(endDate).toLocaleDateString('fi-FI');
        }
    }

    return t('not_specified');
};

export const selectNameVersion = (i18n,item) => {
    switch (i18n.language) {
        case 'en':
            return item.nameEn;
        case 'fi':
            return item.nameFi;
        case 'sv':
            return item.nameSv;
        default:
            return item.nameFi;
    }
};

export const commaSep = (hierarchies) => {
    return hierarchies.map(item => item).join(', ');
};

export const parseDisplayNames = (nameInfoData, lyhenne, emo_lyhenne) => {
    const displayNames = nameInfoData.map((elem) => {
        const emo = emo_lyhenne && emo_lyhenne.value ? emo_lyhenne.value + ', ' : '';
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

/*
Flatten the tree structure for treeSearch component
The input must be array
*/
export const flattenTree = (input, res = []) => {
    input ? input.map(obj => {
        if (!obj.children) {
            res.push(obj);
        } else {
            const modObj = Object.assign({}, obj);
            modObj.children = [];
            res.push(modObj);
            flattenTree(obj.children, res);
        }
     }
    ) : '';
    return res;
};