import HierarchyTable from '../../../components/attributes/HierarchyTable';

export default {
  component: HierarchyTable,
};

export const Default = {
  args: {
    summary: 'Yläyksiköt',
    data: [
      {
        id: '840',
        uniqueId: 46582376,
        startDate: null,
        endDate: null,
        hierarchies: [
          {
            hierarchy: 'talous',
            startDate: '2018-12-31T22:00:00.000+00:00',
            endDate: null,
          },
          {
            hierarchy: 'henkilosto',
            startDate: '2018-12-31T22:00:00.000+00:00',
            endDate: null,
          },
          {
            hierarchy: 'opetus',
            startDate: '2018-12-31T22:00:00.000+00:00',
            endDate: null,
          },
          {
            hierarchy: 'tutkimus',
            startDate: '2018-12-31T22:00:00.000+00:00',
            endDate: null,
          },
          {
            hierarchy: 'toiminnanohjaus',
            startDate: '2017-12-31T22:00:00.000+00:00',
            endDate: null,
          },
        ],
        fullName: 'HY, Yhteinen toiminta (YHT)',
        language: 'fi',
      },
    ],
  },
};
