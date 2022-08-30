import React from 'react';
import * as reactRedux from 'react-redux';
import {
    deepEqual,
    filterAttributeDuplicates,
    filterNodeDuplicates,
    flattenTree,
    showValidity
} from '../src/actions/utilAction';

jest.spyOn(reactRedux, 'useDispatch');

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
}));

// eslint-disable-next-line max-lines-per-function
const inputTree =
    { 'tree': {
            'id': 42785051,
            'code': 'HY',
            'nameFi': 'Helsingin yliopisto',
            'nameEn': 'University of Helsinki',
            'nameSv': 'Helsingfors universitet',
            'displayNameFi': 'Helsingin yliopisto (HY)',
            'displayNameEn': 'University of Helsinki (HY)',
            'displayNameSv': 'Helsingfors universitet (HY)',
            'type': 'yritys_yhteiso',
            'abbreviation': 'HY',
            'children': [
                {
                    'id': 33539259,
                    'code': 'KOULOHJ',
                    'nameFi': 'Koulutusohjelmat',
                    'nameEn': 'Degree Programmes',
                    'nameSv': 'Utbildningsprogram',
                    'displayNameFi': 'HY, Koulutusohjelmat (KOULOHJ)',
                    'displayNameEn': 'HY, Degree Programmes (KOULOHJ)',
                    'displayNameSv': 'HY, Utbildningsprogram (KOULOHJ)',
                    'type': 'koontiyksikko',
                    'abbreviation': 'KOULOHJ',
                    'parentAbbreviation': 'HY',
                    'children': [
                        {
                            'id': 54806742,
                            'code': 'H92',
                            'nameFi': 'Tohtoriohjelmat',
                            'nameEn': 'Doctoral Programmes',
                            'nameSv': 'Doktorandprogram',
                            'displayNameFi': 'HY, Tohtoriohjelmat (TRI)',
                            'displayNameEn': 'HY, Doctoral Programmes (TRI)',
                            'displayNameSv': 'HY, Doktorandprogram (TRI)',
                            'type': 'tiedekunnan kaltainen,koontiyksikko',
                            'abbreviation': 'TRI',
                            'parentAbbreviation': 'HY',
                            'children': [
                                {
                                    'id': 61974091,
                                    'code': 'H920',
                                    'nameFi': 'Humanistis-yhteiskuntatieteellinen tutkijakoulu',
                                    'nameEn': 'Doctoral School in the Humanities and Social Sciences',
                                    'nameSv': 'Humanistisk-samhällsvetenskapliga forskarskolan',
                                    'displayNameFi': 'HY-TRI, Humanistis-yhteiskuntatieteellinen tutkijakoulu (HYMY)',
                                    'displayNameEn': 'HY-TRI, Doctoral School in the Humanities and Social Sciences (HYMY)',
                                    'displayNameSv': 'HY-TRI, Humanistisk-samhällsvetenskapliga forskarskolan (HYMY)',
                                    'type': 'tutkijakoulu',
                                    'abbreviation': 'HYMY',
                                    'parentAbbreviation': 'HY-TRI'
                                }]
                        }]
                },
                {
                    'id': 32800844,
                    'code': '0-TDK',
                    'nameFi': 'Tiedekunnat',
                    'nameEn': 'Faculties',
                    'nameSv': 'Fakulteterna',
                    'displayNameFi': 'HY, Tiedekunnat (TDK)',
                    'displayNameEn': 'HY, Faculties (TDK)',
                    'displayNameSv': 'HY, Fakulteterna (TDK)',
                    'type': 'koontiyksikko',
                    'abbreviation': 'TDK',
                    'parentAbbreviation': 'HY',
                    'children': [
                        {
                            'id': 10020336,
                            'code': 'H20',
                            'nameFi': 'Oikeustieteellinen tiedekunta',
                            'nameEn': 'Faculty of Law',
                            'nameSv': 'Juridiska fakulteten',
                            'displayNameFi': 'HY, Oikeustieteellinen tiedekunta (OIKTDK)',
                            'displayNameEn': 'HY, Faculty of Law (OIKTDK)',
                            'displayNameSv': 'HY, Juridiska fakulteten (OIKTDK)',
                            'type': 'tiedekunta',
                            'abbreviation': 'OIKTDK',
                            'parentAbbreviation': 'HY',
                            'billingCode': 'A20000',
                            'iamGroup': 'hy-oiktdk',
                            'publicity': 'julkinen',
                            'children': [
                                {
                                    'id': 22963335,
                                    'code': 'H200',
                                    'nameFi': 'Oikeustieteellinen tiedekunta',
                                    'nameEn': 'Faculty of Law',
                                    'nameSv': 'Juridiska fakulteten',
                                    'displayNameFi': 'OIKTDK, Oikeustieteellinen tiedekunta (OIKTDK)',
                                    'displayNameEn': 'OIKTDK, Faculty of Law (OIKTDK)',
                                    'displayNameSv': 'OIKTDK, Juridiska fakulteten (OIKTDK)',
                                    'type': 'toimintayksikko',
                                    'abbreviation': 'OIKTDK',
                                    'parentAbbreviation': 'OIKTDK',
                                    'children': [
                                        {
                                            'id': 55134536,
                                            'code': 'H2001',
                                            'nameFi': 'Oikeustieteellinen koulutus, Vaasa',
                                            'nameEn': 'Vaasa Unit of Legal Studies',
                                            'nameSv': 'Juridiska utbildningen i Vasa',
                                            'displayNameFi': 'OIKTDK, Oikeustieteellinen koulutus, Vaasa',
                                            'displayNameEn': 'OIKTDK, Vaasa Unit of Legal Studies',
                                            'displayNameSv': 'OIKTDK, Juridiska utbildningen i Vasa',
                                            'type': 'yksikko',
                                            'parentAbbreviation': 'OIKTDK',
                                            'publicity': 'julkinen'
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
            ]
        }
    };

const historyNodes = [{
    'node': {
        'id': '1',
        'name': 'HY, Keskushallinto uusi nimi (UU99)',
        'startDate': '2018-07-24T18:00:00.000+00:00',
        'endDate': '2018-08-22T18:00:00.000+00:00',
        'timestamp': '2018-08-10T02:54:42.521+00:00',
        'uniqueId': 27452043
    },
    'hierarchies': [
        'henkilosto'
    ]
},
    {
        'node': {
            'id': '3130',
            'name': 'Erilliset laitokset',
            'startDate': null,
            'endDate': null,
            'timestamp': '2017-12-28T08:49:04.463+00:00',
            'uniqueId': 42275629
        },
        'hierarchies': [
            'toiminnanohjaus',
            'opetus',
            'tutkimus',
            'talous',
            'henkilosto'
        ]
    },
    {
        'node': {
            'id': '3140',
            'name': 'HY, Yliopistopalvelut (YPA)',
            'startDate': null,
            'endDate': null,
            'timestamp': '2020-01-24T13:29:24.426+00:00',
            'uniqueId': 77096679
        },
        'hierarchies': [
            'opetus',
            'talous',
            'tutkimus',
            'henkilosto'
        ]
    }];

const futureNodes = [{
    'node': {
        'id': '3140',
        'name': 'HY, Yliopistopalvelut (YPA)',
        'startDate': null,
        'endDate': null,
        'timestamp': '2020-01-24T13:29:24.426+00:00',
        'uniqueId': 77096679
    },
    'hierarchies': [
        'opetus',
        'talous',
        'tutkimus',
        'henkilosto'
    ]
},
    {
        'node': {
            'id': '3236',
            'name': 'OIKTDK, Oikeustieteellinen tiedekunta (OIKTDK)',
            'startDate': null,
            'endDate': null,
            'timestamp': '2018-07-09T07:22:50.110+00:00',
            'uniqueId': 22963335
        },
        'hierarchies': [
            'toiminnanohjaus'
        ]
    },
    {
        'node': {
            'id': '3319',
            'name': 'Helsingin taloustieteellinen tutkimuskeskus (HECER)',
            'startDate': null,
            'endDate': '2012-12-30T22:00:00.000+00:00',
            'timestamp': null,
            'uniqueId': 90578829
        },
        'hierarchies': [
            'talous'
        ]
    }];

const historyAttributes = [{
    'key': 'lyhenne',
    'value': 'TIKE',
    'startDate': null,
    'endDate': null
},
    {
        'key': 'mainari_tunnus',
        'value': 'ATKOS',
        'startDate': null,
        'endDate': null
    },
    {
        'key': 'laskutus_tunnus',
        'value': 'A02700',
        'startDate': null,
        'endDate': null
    }];

const futureAttributes = [{
    'key': 'laskutus_tunnus',
    'value': 'A02700',
    'startDate': null,
    'endDate': null
},
    {
        'key': 'talous_tunnus',
        'value': 'H907',
        'startDate': '2011-01-01T00:00:00.000+00:00',
        'endDate': '2016-01-01T00:00:00.000+00:00'
    },
    {
        'key': 'talous_tunnus',
        'value': 'H907',
        'startDate': '2017-01-01T00:00:00.000+00:00',
        'endDate': null
    },
    {
        'key': 'type',
        'value': 'erillinen laitos',
        'startDate': '2011-01-01T00:00:00.000+00:00',
        'endDate': null
    }];

test('flattenTree result is not larger than original tree', () => {
    const flatTreee = flattenTree(inputTree.tree.children);
    const flatSize = encodeURI(JSON.stringify(flatTreee).split(/%..|./).length - 1);
    const treeSize = encodeURI(JSON.stringify(inputTree).split(/%..|./).length - 1);
    expect(flatSize / 1024).toBeLessThanOrEqual(treeSize / 1024);
});

test('Node duplicates are filtered', () => {
    expect(historyNodes.length + futureNodes.length).toEqual(6);
    expect(filterNodeDuplicates(historyNodes, futureNodes).length).toEqual(5);
});

test('Attribute duplicates are filtered', () => {
    expect(historyAttributes.length + futureAttributes.length).toEqual(7);
    expect(filterAttributeDuplicates(historyAttributes, futureAttributes).length).toEqual(6);
});

test('deepEqual distinguishes different and similar objects', () => {
    const obj1 = {
        name: 'boo',
        size: 'large',
        scary: 'much'
    };
    const obj2 = {
        name: 'boo',
        size: 'large',
        scary: 'much'
    };
    const obj3 = {
        name: 'boo',
        size: 'large',
        scary: 'some'
    };
    expect(deepEqual(obj1, obj2)).toBeTruthy;
    expect(deepEqual(obj1, obj3)).toBeFalsy;
});
test('the from dates render as expected', () => {
    const t = (str) => str;
    const i18n = { language: 'fi' };
    const parseDate = showValidity('2013-12-31T20:00:00.000+00:00', null, i18n, t);
    expect(parseDate).toMatch(/12|31[./]12|31[./]2013from_date/);
});

test('the until dates render as expected', () => {
    const t = (str) => str;
    const i18n = { language: 'fi' };
    const parseDate = showValidity(null, '2016-12-31 00:00:00', i18n, t);
    expect(parseDate).toMatch(/12|31[./]12|31[./]2016until_date/);
});

test('the time period dates render as expected', () => {
    const t = (str) => str;
    const i18n = { language: 'fi' };
    const parseDate = showValidity('2013-12-31T20:00:00.000+00:00', '2016-12-31 00:00:00', i18n, t);
    expect(parseDate).toMatch(/12|31[./]12|31[./]2013 - 12|31[./]12|31[./]2016/);
});

test('the missing date message rendes as expected', () => {
    const t = (str) => str;
    const i18n = { language: 'fi' };
    const parseDate = showValidity(null, null, i18n, t);
    expect(parseDate).toMatch('not_specified');
});
