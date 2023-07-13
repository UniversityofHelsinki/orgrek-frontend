import ChildrenSection from '../../../components/nodeDetails/ChildrenSection';
import {
  createHierarchies,
  mockGetChildren,
  mockSaveChildren,
  mockSaveParents,
  withHierarchy,
  withMockStore,
} from '../../../mockStore';
import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const now = new Date('2023-03-22T14:28:00+0200');
const nodeId = '1';
const selectedHierarchy = 'talous,toiminnanohjaus';

export default {
  component: ChildrenSection,
  parameters: {
    systemTime: now,
    reactRouter: {
      searchParams: {
        uid: nodeId,
      },
    },
  },
  decorators: [
    withMockStore({
      tree: {
        selectedHierarchy,
      },
      dr: {
        selectedDay: now,
      },
    }),
  ],
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        mockGetChildren(nodeId, now, selectedHierarchy, {
          fi: [
            {
              id: '1000',
              uniqueId: 1000000,
              startDate: null,
              endDate: null,
              hierarchies: [
                {
                  hierarchy: 'talous',
                  startDate: '2000-01-01',
                  endDate: null,
                  edgeId: 20003,
                },
                {
                  hierarchy: 'toiminnanohjaus',
                  startDate: '2000-01-01',
                  endDate: null,
                  edgeId: 20004,
                },
              ],
              fullName: 'Child node 1',
              language: 'fi',
            },
            {
              id: '1001',
              uniqueId: 1000001,
              startDate: null,
              endDate: null,
              hierarchies: [
                {
                  hierarchy: 'talous',
                  startDate: '2000-01-01',
                  endDate: null,
                  edgeId: 20004,
                },
                {
                  hierarchy: 'toiminnanohjaus',
                  startDate: '2000-01-01',
                  endDate: null,
                  edgeId: 20005,
                },
              ],
              fullName: 'Child node 2',
              language: 'fi',
            },
            {
              id: '1002',
              uniqueId: 1000002,
              startDate: null,
              endDate: null,
              hierarchies: [
                {
                  hierarchy: 'talous',
                  startDate: '2000-01-01',
                  endDate: null,
                  edgeId: 20005,
                },
                {
                  hierarchy: 'toiminnanohjaus',
                  startDate: '2000-01-01',
                  endDate: null,
                  edgeId: 20006,
                },
              ],
              fullName: 'Child node 3',
              language: 'fi',
            },
          ],
        }),
        mockSaveChildren(),
      ],
    },
  },
  decorators: [],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Alayksiköt')).toBeInTheDocument();
    });
    await expect(canvas.getByText('Child node 1')).toBeInTheDocument();
    await expect(canvas.getByText('Child node 2')).toBeInTheDocument();
    await expect(canvas.getByText('Child node 3')).toBeInTheDocument();
  },
};

export const Empty = {
  decorators: [withHierarchy({ children: {} })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Ei alayksiköitä')).toBeInTheDocument();
    });
  },
};
