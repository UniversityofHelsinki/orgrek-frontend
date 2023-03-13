import { mockGetNameAttributes, withMockStore } from '../../../mockStore';
import NameSection from '../../../components/nodeDetails/NameSection';

const nodeId = '1';

const data = [
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
];

export default {
  component: NameSection,
  parameters: {
    reactRouter: {
      searchParams: {
        uid: nodeId,
      },
    },
  },
};

export const Default = {
  parameters: {
    msw: {
      handlers: [mockGetNameAttributes(nodeId, data)],
    },
  },
  decorators: [withMockStore()],
};

export const Empty = {
  parameters: {
    msw: {
      handlers: [mockGetNameAttributes(nodeId, [])],
    },
  },
  decorators: [withMockStore()],
};

export const ShowHistory = {
  parameters: {
    msw: {
      handlers: [mockGetNameAttributes(nodeId, data)],
    },
  },
  decorators: [
    withMockStore({
      nvrd: {
        showHistory: true,
      },
    }),
  ],
};
