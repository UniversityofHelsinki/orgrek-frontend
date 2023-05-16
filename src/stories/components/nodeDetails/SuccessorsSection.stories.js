import {
  mockGetSuccessors,
  mockSaveSuccessors,
  withMockStore,
  withNode,
} from '../../../mockStore';
import SuccessorsSection from '../../../components/nodeDetails/SuccessorsSection';
import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const now = new Date('2023-03-22T14:28:00+0200');

const nodeId = '1';

export default {
  component: SuccessorsSection,
  parameters: {
    systemTime: now,
    reactRouter: {
      searchParams: {
        uid: nodeId,
      },
    },
  },
  decorators: [withMockStore()],
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        mockGetSuccessors(nodeId, {
          fi: [
            {
              id: '1001',
              uniqueId: 10000001,
              startDate: '1970-01-01',
              endDate: '2017-05-05',
              edgeStartDate: '2017-05-06',
              fullName: 'Successor 1',
              language: 'fi',
            },
            {
              id: '1002',
              uniqueId: 10000002,
              startDate: '1970-01-01',
              endDate: null,
              edgeStartDate: null,
              fullName: 'Successor 2',
              language: 'fi',
            },
          ],
        }),
        mockSaveSuccessors(nodeId),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Successor 1')).toBeInTheDocument();
    });
    await expect(canvas.getByText('Successor 2')).toBeInTheDocument();
  },
};

export const Empty = {
  decorators: [withNode()],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(
        canvas.getByText('Ei seuraavia yksiköitä')
      ).toBeInTheDocument();
    });
  },
};
