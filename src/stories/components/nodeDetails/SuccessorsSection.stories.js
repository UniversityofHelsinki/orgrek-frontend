import {
  mockGetNodeValidity,
  mockGetSuccessors,
  mockGetTree,
  mockSaveSuccessors,
  tree,
  withMockStore,
  withNode,
} from '../../../mockStore';
import SuccessorsSection from '../../../components/nodeDetails/SuccessorsSection';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const now = new Date('2023-03-22T14:28:00+0200');
const selectedHierarchy = 'virallinen';

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
  decorators: [
    withMockStore({
      dr: {
        selectedDay: now,
      },
      tree: {
        selectedHierarchy,
      },
    }),
  ],
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        mockGetTree({ hierarchies: selectedHierarchy, selectedDay: now }, tree),
        mockGetNodeValidity(10000001, {
          startDate: '1970-01-01',
          endDate: '2017-05-05',
        }),
        mockGetNodeValidity(10000002, {
          startDate: '1972-01-01',
          endDate: null,
        }),
        mockGetNodeValidity(10000003, {
          startDate: null,
          endDate: null,
        }),
        mockGetSuccessors(nodeId, {
          fi: [
            {
              id: '1001',
              uniqueId: 10000001,
              startDate: '1970-01-01',
              endDate: '2017-05-05',
              edgeId: 32225,
              edgeStartDate: '2017-05-06',
              fullName: 'Successor 1',
              language: 'fi',
            },
            {
              id: '1002',
              uniqueId: 10000002,
              startDate: '1972-01-01',
              endDate: null,
              edgeStartDate: null,
              edgeId: 32226,
              fullName: 'Successor 2',
              language: 'fi',
            },
            {
              id: '1003',
              uniqueId: 10000003,
              startDate: null,
              endDate: null,
              edgeStartDate: null,
              edgeId: 32227,
              fullName: 'Successor 3',
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

export const EditMode = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Muokkaa')).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByText('Muokkaa'));

    await waitFor(async () => {
      await expect(canvas.getByText('Tallenna')).toBeDisabled();
    });
    await waitFor(async () => {
      await expect(
        canvas.getByText('Yksikön voimassaolo 1.1.1970 - 5.5.2017')
      ).toBeInTheDocument();
    });
    await waitFor(async () => {
      await expect(
        canvas.getByText('Yksikön voimassaolo 1.1.1972 alkaen')
      ).toBeInTheDocument();
    });
    await waitFor(async () => {
      await expect(
        canvas.getByText('Yksikön voimassaoloa ei määritetty')
      ).toBeInTheDocument();
    });
  },
};
