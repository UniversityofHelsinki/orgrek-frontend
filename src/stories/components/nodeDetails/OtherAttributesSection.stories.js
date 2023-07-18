import {
  mockGetAttributeKeys,
  mockGetOtherAttributes,
  mockSaveOtherAttributes,
  withMockStore,
} from '../../../mockStore';
import OtherAttributesSection from '../../../components/nodeDetails/OtherAttributesSection';
import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const nodeId = '12345678';
const selectedHierarchy = 'virallinen';
const keys = ['publicity', 'attribute2'];

export default {
  component: OtherAttributesSection,
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
        mockGetOtherAttributes(nodeId, selectedHierarchy, [
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
            key: 'attribute2',
            value: 'previous value',
            startDate: '2013-01-01',
            endDate: '2015-06-30',
          },
          {
            id: 1002,
            nodeId: '1',
            key: 'attribute2',
            value: 'current value',
            startDate: '2015-07-01',
            endDate: '2023-12-31',
          },
          {
            id: 1002,
            nodeId: '1',
            key: 'attribute2',
            value: 'next value',
            startDate: '2024-01-01',
            endDate: null,
          },
        ]),
        mockSaveOtherAttributes(nodeId),
        mockGetAttributeKeys(
          {
            selectedHierarchies: selectedHierarchy,
            sections: ['other_attributes'],
          },
          keys
        ),
      ],
    },
  },
  decorators: [
    withMockStore({
      tree: {
        selectedHierarchy,
      },
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Muut attribuutit')).toBeInTheDocument();
    });
    await expect(canvas.queryByText('Julkinen')).toBeInTheDocument();
    await expect(canvas.queryByText('current value')).toBeInTheDocument();
    await expect(canvas.queryByText('previous value')).not.toBeInTheDocument();
    await expect(canvas.queryByText('next value')).not.toBeInTheDocument();
  },
};

export const Empty = {
  ...Default,
  parameters: {
    msw: {
      handlers: [
        mockGetOtherAttributes(nodeId, selectedHierarchy, []),
        mockSaveOtherAttributes(nodeId),
        mockGetAttributeKeys(
          {
            selectedHierarchies: selectedHierarchy,
            sections: ['other_attributes'],
          },
          keys
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(
        canvas.getByText('Ei muita attribuutteja')
      ).toBeInTheDocument();
    });
  },
};

export const ShowHistory = {
  ...Default,
  decorators: [
    withMockStore({
      nvrd: {
        showHistory: true,
      },
      tree: {
        selectedHierarchy,
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
  ...Default,
  decorators: [
    withMockStore({
      nvrd: {
        showHistory: true,
        showComing: true,
      },
      tree: {
        selectedHierarchy,
      },
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
