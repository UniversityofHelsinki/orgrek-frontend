import {
  mockGetAttributeKeys,
  mockGetCodeAttributes,
  mockSaveCodeAttributes,
  withMockStore,
} from '../../../mockStore';
import CodeAttributesSection from '../../../components/nodeDetails/CodeAttributesSection';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const nodeId = '12345678';
const selectedHierarchy = 'talous';

export default {
  component: CodeAttributesSection,
  parameters: {
    systemTime: now,
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
      handlers: [
        mockGetAttributeKeys(selectedHierarchy, [
          'emo_lyhenne',
          'lyhenne',
          'talous_tunnus',
        ]),
        mockGetCodeAttributes(nodeId, [
          {
            id: 1001,
            nodeId: '1',
            key: 'lyhenne',
            value: 'LYH',
            startDate: '1970-01-01',
            endDate: null,
          },
          {
            id: 1002,
            nodeId: '1',
            key: 'emo_lyhenne',
            value: 'EMO',
            startDate: null,
            endDate: null,
          },
          {
            id: 1003,
            nodeId: '1',
            key: 'iam_ryhma',
            value: 'group1',
            startDate: null,
            endDate: null,
          },
          {
            id: 1004,
            nodeId: '1',
            key: 'talous_tunnus',
            value: '101',
            startDate: null,
            endDate: null,
          },
          {
            id: 1005,
            nodeId: '1',
            key: 'hr_lyhenne',
            value: 'HRLYH',
            startDate: null,
            endDate: null,
          },
          {
            id: 1006,
            nodeId: '1',
            key: 'hr_tunnus',
            value: 'HR102',
            startDate: null,
            endDate: null,
          },
          {
            id: 1007,
            nodeId: '1',
            key: 'tutkimus_tunnus',
            value: 'TUT102',
            startDate: null,
            endDate: null,
          },
          {
            id: 1008,
            nodeId: '1',
            key: 'oppiaine_tunnus',
            value: 'OPP102',
            startDate: null,
            endDate: null,
          },
          {
            id: 1009,
            nodeId: '1',
            key: 'laskutus_tunnus',
            value: 'LAS102',
            startDate: null,
            endDate: null,
          },
          {
            id: 1010,
            nodeId: '1',
            key: 'mainari_tunnus',
            value: 'MAI102',
            startDate: null,
            endDate: null,
          },
        ]),
        mockSaveCodeAttributes(nodeId),
      ],
    },
  },
  decorators: [
    withMockStore({
      nrd: {
        node: {
          uniqueId: nodeId,
        },
      },
      tree: { selectedHierarchy },
    }),
  ],
};

export const Empty = {
  parameters: {
    msw: {
      handlers: [
        mockGetAttributeKeys('talous', [
          'emo_lyhenne',
          'lyhenne',
          'talous_tunnus',
        ]),
        mockGetCodeAttributes(nodeId, []),
        mockSaveCodeAttributes(nodeId),
      ],
    },
  },
  decorators: [
    withMockStore({
      tree: { selectedHierarchy },
    }),
  ],
};
