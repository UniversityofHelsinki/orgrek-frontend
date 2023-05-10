import { withNode } from '../../../mockStore';
import PredecessorsSection from '../../../components/nodeDetails/PredecessorsSection';
import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: PredecessorsSection,
};

export const Default = {
  decorators: [
    withNode({
      nodePredecessors: {
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
      },
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Edeltävät yksiköt')).toBeInTheDocument();
    });
    await expect(
      canvas.getByText('Rehtorin kanslia (H01A)')
    ).toBeInTheDocument();
  },
};

export const Empty = {
  decorators: [withNode()],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(
        canvas.getByText('Ei edeltäviä yksiköitä')
      ).toBeInTheDocument();
    });
  },
};
