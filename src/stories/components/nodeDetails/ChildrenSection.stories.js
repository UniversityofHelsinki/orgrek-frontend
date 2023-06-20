import ChildrenSection from '../../../components/nodeDetails/ChildrenSection';
import { createHierarchies, withHierarchy } from '../../../mockStore';
import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: ChildrenSection,
};

export const Default = {
  decorators: [
    withHierarchy({
      children: {
        fi: [
          {
            id: '1000',
            uniqueId: 1000000,
            startDate: null,
            endDate: null,
            hierarchies: createHierarchies(undefined, '1970-01-01'),
            fullName: 'Child node 1',
            language: 'fi',
          },
          {
            id: '1001',
            uniqueId: 1000001,
            startDate: null,
            endDate: null,
            hierarchies: createHierarchies(),
            fullName: 'Child node 2',
            language: 'fi',
          },
          {
            id: '1002',
            uniqueId: 1000002,
            startDate: null,
            endDate: null,
            hierarchies: createHierarchies(),
            fullName: 'Child node 3',
            language: 'fi',
          },
        ],
      },
    }),
  ],
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
