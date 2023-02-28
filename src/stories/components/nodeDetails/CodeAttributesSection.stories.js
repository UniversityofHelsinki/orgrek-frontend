import { withMockStore, withNode } from '../../../mockStore';
import CodeAttributesSection from '../../../components/nodeDetails/CodeAttributesSection';

export default {
  component: CodeAttributesSection,
};

export const Default = {
  decorators: [
    withNode({
      node: {
        uniqueId: 12345678,
      },
      nodeAttributes: [
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
      ],
    }),
  ],
};

export const Empty = {
  decorators: [withMockStore({ nrd: { node: null, nodeAttributes: [] } })],
};
