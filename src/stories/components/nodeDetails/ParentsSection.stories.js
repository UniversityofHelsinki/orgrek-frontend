import ParentsSection from '../../../components/nodeDetails/ParentsSection';
import { createHierarchies, withHierarchy } from '../../../mockStore';
import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: ParentsSection,
};

export const Default = {
  decorators: [
    withHierarchy({
      parents: {
        fi: [
          {
            id: '1000',
            uniqueId: 1000000,
            startDate: null,
            endDate: null,
            hierarchies: createHierarchies(null, '1970-01-01'),
            fullName: 'Parent node 1',
            language: 'fi',
          },
          {
            id: '1001',
            uniqueId: 1000001,
            startDate: null,
            endDate: null,
            hierarchies: createHierarchies(['tutkimus', 'opetus']),
            fullName: 'Parent node 2',
            language: 'fi',
          },
        ],
      },
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Yläyksiköt')).toBeInTheDocument();
    });
    await expect(canvas.getByText('Parent node 1')).toBeInTheDocument();
    await expect(canvas.getByText('Parent node 2')).toBeInTheDocument();
  },
};

export const Empty = {
  decorators: [withHierarchy({ parents: {} })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Ei yläyksiköitä')).toBeInTheDocument();
    });
  },
};
