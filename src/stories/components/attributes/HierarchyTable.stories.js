import HierarchyTable from '../../../components/attributes/HierarchyTable';

export default {
  component: HierarchyTable,
};

export const Default = {
  args: {
    summary: 'Yläyksiköt',
    data: [
      {
        node: {
          id: '1001',
          uniqueId: 10000001,
          startDate: null,
          endDate: null,
          name: 'Alayksikkö 1',
          names: {
            fi: 'Alayksikkö 1',
            en: 'Alayksikkö 1',
            sv: 'Alayksikkö 1',
          },
        },
        edges: [
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
      },
      {
        node: {
          id: '1002',
          uniqueId: 10000002,
          startDate: null,
          endDate: null,
          name: 'Alayksikkö 2',
          names: {
            fi: 'Alayksikkö 2',
            en: 'Alayksikkö 2',
            sv: 'Alayksikkö 2',
          },
        },
        edges: [
          {
            hierarchy: 'virallinen',
            startDate: null,
            endDate: null,
          },
        ],
      },
    ],
  },
};
