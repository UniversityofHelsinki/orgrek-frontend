import HierarchyTable from '../../../components/attributes/HierarchyTable';

export default {
  component: HierarchyTable,
};

export const Default = {
  args: {
    summary: 'Yläyksiköt',
    data: [
      {
        id: '1001',
        uniqueId: 10000001,
        startDate: null,
        endDate: null,
        hierarchies: [
          {
            hierarchy: 'virallinen',
            startDate: '2018-12-31',
            endDate: null,
          },
          {
            hierarchy: 'henkilosto',
            startDate: '2018-12-31',
            endDate: null,
          },
          {
            hierarchy: 'opetus',
            startDate: '2018-12-31',
            endDate: null,
          },
          {
            hierarchy: 'tutkimus',
            startDate: '2018-12-31',
            endDate: null,
          },
          {
            hierarchy: 'toiminnanohjaus',
            startDate: '2017-12-31',
            endDate: null,
          },
        ],
        fullName: 'Alayksikkö 1',
        language: 'fi',
      },
      {
        id: '1002',
        uniqueId: 10000002,
        startDate: null,
        endDate: null,
        hierarchies: [
          {
            hierarchy: 'virallinen',
            startDate: null,
            endDate: null,
          },
        ],
        fullName: 'Alayksikkö 2',
        language: 'fi',
      },
    ],
  },
};
