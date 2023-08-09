import {
  mockGetPredecessors,
  withMockStore,
  withNode,
} from '../../../mockStore';
import PredecessorsSection from '../../../components/nodeDetails/PredecessorsSection';
import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const today = new Date();
const nodeId = '1';
export default {
  component: PredecessorsSection,
  parameters: {
    reactRouter: {
      searchParams: {
        uid: nodeId,
      },
    },
    msw: {
      handlers: [
        mockGetPredecessors(nodeId, today, {
          fi: [
            {
              id: '1001',
              uniqueId: 10000001,
              startDate: null,
              endDate: '2016-04-29',
              hierarchy: null,
              edgeStartDate: '2016-04-30',
              edgeEndDate: null,
              fullName: 'Rehtorin kanslia (H01A)',
              language: 'fi',
            },
          ],
        }),
      ],
    },
  },
};

export const Default = {
  decorators: [
    withMockStore({
      dr: {
        selectedDay: today,
      },
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Edeltävät yksiköt')).toBeInTheDocument();
    });
    await waitFor(async () => {
      await expect(
        canvas.getByText('Rehtorin kanslia (H01A)')
      ).toBeInTheDocument();
    });
  },
};

export const Empty = {
  decorators: [withNode()],
  parameters: {
    msw: {
      handlers: [
        mockGetPredecessors(nodeId, today, {
          fi: [],
          sv: [],
          en: [],
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(
        canvas.getByText('Ei edeltäviä yksiköitä')
      ).toBeInTheDocument();
    });
  },
};
