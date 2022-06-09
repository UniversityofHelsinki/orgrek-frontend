import React from 'react';
import { screen, render } from './testUtils';
import NodeDetailsTable from '../src/components/NodeDetailsTable';


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
  const contentDataKeyValue = [
    {
        'key': 'emo_lyhenne',
        'value': 'HY',
        'startDate': null,
        'endDate': null
    },
    {
        'key': 'hr_lyhenne',
        'value': 'H30',
        'startDate': '2013-12-31T20:00:00.000+00:00',
        'endDate': null
    },
    {
        'key': 'laskutus_tunnus',
        'value': 'A30000',
        'startDate': null,
        'endDate': null
    },
    {
        'key': 'lyhenne',
        'value': 'LTDK',
        'startDate': null,
        'endDate': null
    },
    {
        'key': 'mainari_tunnus',
        'value': 'LTDK',
        'startDate': null,
        'endDate': null
    },
    {
        'key': 'talous_tunnus',
        'value': 'H30',
        'startDate': null,
        'endDate': null
    }
];

  const contentDataNodeHierarchy = [{
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
    },
    {
        'node': {
            'id': '6777',
            'name': 'HY, Muut yksiköt (MUUT)',
            'startDate': '2009-12-31T22:00:00.000+00:00',
            'endDate': null,
            'timestamp': '2018-08-13T09:51:49.232+00:00',
            'uniqueId': 74223428
        },
        'hierarchies': [
            'toiminnanohjaus',
            'opetus',
            'talous',
            'henkilosto',
            'tutkimus'
        ]
    }
];

  const contentDataNameValidity = [
      {
          'nodeEdgeHistoryWrapper': {
              'edgeEndDate': null,
              'edgeStartDate': null,
              'endDate': '2016-12-30T22:00:00.000+00:00',
              'id': '3471',
              'name': 'HY, Helsingin yliopiston koulutus- ja kehittämispalvelut (HYKKE)',
              'startDate': null,
              'uniqueId': 21682135
          }
      },
      {
          'nodeEdgeHistoryWrapper': {
              'edgeEndDate': null,
              'edgeStartDate': null,
              'endDate': '2013-12-30T22:00:00.000+00:00',
              'id': '3337',
              'name': 'IPR University Center',
              'startDate': null,
              'uniqueId': 75908005
          }
      }
];

test('key-value NodeDetailsTable renders', () => {
    render(<NodeDetailsTable
        type='key-value'
        heading='Koodisto'
        tableLabels={['koodi', 'arvo']}
        contentData={contentDataKeyValue}
        hasValidity={true}
        />);
    const nodeTable = screen.getByTestId('node-details-table');
    expect(nodeTable).toBeDefined();
});

test('node-hierarchy NodeDetailsTable renders', () => {
    render(<NodeDetailsTable
        type='node-hierarchy'
        heading='upper_units'
        tableLabels={['yksikkö', 'hierarkiat']}
        contentData={contentDataNodeHierarchy}
        hasValidity={false}
        />);
    const nodeTable = screen.getByTestId('node-details-table');
    expect(nodeTable).toBeDefined();
});

test('name-validity NodeDetailsTable renders', () => {
    render(<NodeDetailsTable
        type='name-validity'
        heading='successors'
        tableLabels={['nimi', 'voimassaolo', 'yhteyden päivänmäärä']}
        contentData={contentDataNameValidity}
        hasValidity={false}
        />);
    const nodeTable = screen.getByTestId('node-details-table');
    expect(nodeTable).toBeDefined();
});

