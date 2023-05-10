import { createNodeState, withMockStore, withNode } from '../../../mockStore';
import OtherAttributesSection from '../../../components/nodeDetails/OtherAttributesSection';
import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

export default {
  component: OtherAttributesSection,
  parameters: {
    systemTime: now,
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Muut attribuutit')).toBeInTheDocument();
    });
    await expect(canvas.getByText('Julkinen')).toBeInTheDocument();
    await expect(canvas.getByText('some value')).toBeInTheDocument();
  },
};

export const Empty = {
  decorators: [withNode({ nodeAttributes: [] })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Ei attribuutteja')).toBeInTheDocument();
    });
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('previous value')).toBeInTheDocument();
    });
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('previous value')).toBeInTheDocument();
    });
    await expect(canvas.getByText('current value')).toBeInTheDocument();
    await expect(canvas.getByText('next value')).toBeInTheDocument();
  },
};
