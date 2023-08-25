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

const predecessors = [
  {
    node: {
      uniqueId: 1,
      startDate: null,
      endDate: '2016-04-29',
      name: 'Rehtorin kanslia (H01A)',
      names: {
        fi: 'Rehtorin kanslia (H01A)',
        sv: 'Hå',
        en: 'Ho',
      },
    },
    edges: [
      {
        id: '1001',
        startDate: '2016-04-30',
        endDate: null,
        hierarchy: 'history',
      },
    ],
  },
];

const emptyPredecessors = [];

export default {
  component: PredecessorsSection,
  parameters: {
    reactRouter: {
      searchParams: {
        uid: nodeId,
      },
    },
    msw: {
      handlers: [mockGetPredecessors(nodeId, today, predecessors)],
    },
  },
};

export const Default = {
  systemTime: today,
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
      handlers: [mockGetPredecessors(nodeId, today, emptyPredecessors)],
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
