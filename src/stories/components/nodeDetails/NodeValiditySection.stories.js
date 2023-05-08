import {
  mockGetNodeValidity,
  mockSaveNodeValidity,
  withMockStore,
} from '../../../mockStore';
import NodeValiditySection from '../../../components/nodeDetails/NodeValiditySection';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const now = new Date('2023-03-22T14:28:00+0200');
const nodeId = '1';

export default {
  component: NodeValiditySection,
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
  decorators: [withMockStore()],
  parameters: {
    msw: {
      handlers: [
        mockGetNodeValidity(nodeId, {
          startDate: '2000-01-01',
          endDate: null,
        }),
        mockSaveNodeValidity(nodeId),
      ],
    },
  },
};
export const Empty = {
  ...Default,
  parameters: {
    msw: {
      handlers: [
        mockGetNodeValidity(nodeId, {
          startDate: null,
          endDate: null,
        }),
        mockSaveNodeValidity(nodeId),
      ],
    },
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
  },
};
