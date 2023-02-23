import { createNodeState, withMockStore } from '../../../mockStore';
import NameSection from '../../../components/nodeDetails/NameSection';

export default {
  component: NameSection,
};

export const Default = {
  decorators: [
    withMockStore({
      nrd: createNodeState(null, [
        {
          id: 4826,
          nodeId: '4820',
          key: 'name_fi',
          value: 'Tietotekniikkaratkaisut',
          startDate: null,
          endDate: null,
        },
        {
          id: 4822,
          nodeId: '4820',
          key: 'name_sv',
          value: 'Datatekniklösningar',
          startDate: null,
          endDate: null,
        },
        {
          id: 4821,
          nodeId: '4820',
          key: 'name_en',
          value: 'IT Solutions',
          startDate: null,
          endDate: null,
        },
      ]),
    }),
  ],
};

export const Empty = {
  decorators: [withMockStore()],
};

export const ShowHistory = {
  decorators: [
    withMockStore({
      nvrd: {
        showHistory: true,
      },
      nrd: createNodeState(null, [
        {
          id: 4826,
          nodeId: '4820',
          key: 'name_fi',
          value: 'Tietotekniikkaratkaisut 1',
          startDate: null,
          endDate: '1999-12-31',
        },
        {
          id: 4822,
          nodeId: '4820',
          key: 'name_sv',
          value: 'Datatekniklösningar',
          startDate: null,
          endDate: null,
        },
        {
          id: 4821,
          nodeId: '4820',
          key: 'name_en',
          value: 'IT Solutions 1',
          startDate: null,
          endDate: '1999-12-31',
        },
        {
          id: 4826,
          nodeId: '4820',
          key: 'name_fi',
          value: 'Tietotekniikkaratkaisut 2',
          startDate: '2000-01-01',
          endDate: '2022-12-31',
        },
        {
          id: 4821,
          nodeId: '4820',
          key: 'name_en',
          value: 'IT Solutions 2',
          startDate: '2000-01-01',
          endDate: '2022-12-31',
        },
        {
          id: 4826,
          nodeId: '4820',
          key: 'name_fi',
          value: 'Tietotekniikkaratkaisut 3',
          startDate: '2023-01-01',
          endDate: null,
        },
        {
          id: 4821,
          nodeId: '4820',
          key: 'name_en',
          value: 'IT Solutions 3',
          startDate: '2023-01-01',
          endDate: null,
        },
      ]),
    }),
  ],
};
