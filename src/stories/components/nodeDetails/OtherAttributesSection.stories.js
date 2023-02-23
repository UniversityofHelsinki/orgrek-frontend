import { createNodeState, withMockStore, withNode } from '../../../mockStore';
import OtherAttributesSection from '../../../components/nodeDetails/OtherAttributesSection';

export default {
  component: OtherAttributesSection,
};

export const Default = {
  decorators: [
    withNode({
      nodeAttributes: [
        {
          id: 1001,
          nodeId: '1',
          key: 'publicity',
          value: 'julkinen',
          startDate: null,
          endDate: null,
        },
        {
          id: 1002,
          nodeId: '1',
          key: 'Additional attribute',
          value: 'some value',
          startDate: '2013-01-01',
          endDate: '2015-06-30',
        },
      ],
    }),
  ],
};

export const Empty = {
  decorators: [withNode({ nodeAttributes: [] })],
};

export const ShowHistory = {
  decorators: [
    withMockStore({
      nvrd: {
        showHistory: true,
      },
      nrd: {
        nodeAttributesHistory: [
          {
            id: 1001,
            nodeId: '1',
            key: 'publicity',
            value: 'julkinen',
            startDate: null,
            endDate: null,
          },
          {
            id: 1002,
            nodeId: '1',
            key: 'Additional attribute',
            value: 'previous value',
            startDate: '2013-01-01',
            endDate: '2015-06-30',
          },
          {
            id: 1002,
            nodeId: '1',
            key: 'Additional attribute',
            value: 'current value',
            startDate: '2015-07-01',
            endDate: '2023-12-31',
          },
        ],
      },
    }),
  ],
};

export const HistoryAndFuture = {
  decorators: [
    withMockStore({
      nvrd: {
        showHistory: true,
        showComing: true,
      },
      nrd: createNodeState({
        nodeAttributesHistory: [
          {
            id: 1001,
            nodeId: '1',
            key: 'publicity',
            value: 'julkinen',
            startDate: null,
            endDate: null,
          },
          {
            id: 1002,
            nodeId: '1',
            key: 'Additional attribute',
            value: 'previous value',
            startDate: '2013-01-01',
            endDate: '2015-06-30',
          },
          {
            id: 1002,
            nodeId: '1',
            key: 'Additional attribute',
            value: 'current value',
            startDate: '2015-07-01',
            endDate: '2023-12-31',
          },
        ],
        nodeAttributesFuture: [
          {
            id: 1001,
            nodeId: '1',
            key: 'publicity',
            value: 'julkinen',
            startDate: null,
            endDate: null,
          },
          {
            id: 1002,
            nodeId: '1',
            key: 'Additional attribute',
            value: 'current value',
            startDate: '2015-07-01',
            endDate: '2023-12-31',
          },
          {
            id: 1002,
            nodeId: '1',
            key: 'Additional attribute',
            value: 'next value',
            startDate: '2024-01-01',
            endDate: null,
          },
        ],
      }),
    }),
  ],
};
