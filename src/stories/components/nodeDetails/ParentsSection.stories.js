import ParentsSection from '../../../components/nodeDetails/ParentsSection';
import {
  mockGetParents,
  mockSaveParents,
  withMockStore,
} from '../../../mockStore';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { waitForAnimations } from '../../storyUtils';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const nodeId = '1';
const selectedHierarchy = 'talous,toiminnanohjaus';

export default {
  component: ParentsSection,
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
        mockGetParents(nodeId, now, selectedHierarchy, {
          fi: [
            {
              id: '1000',
              edgeId: 20001,
              uniqueId: 1000000,
              startDate: '2009-01-01',
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
              fullName: 'Parent node 1',
              language: 'fi',
            },
            {
              id: '1001',
              edgeId: 20002,
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
              fullName: 'Parent node 2',
              language: 'fi',
            },
          ],
        }),
        mockSaveParents(),
      ],
    },
  },
  decorators: [],
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
  parameters: {
    msw: {
      handlers: [
        mockGetParents(nodeId, now, selectedHierarchy, {
          fi: [
            {
              id: '1000',
              edgeId: 20001,
              uniqueId: 1000000,
              startDate: '2009-01-01',
              endDate: null,
              hierarchies: [
                {
                  hierarchy: 'talous',
                  startDate: '2000-01-01',
                  endDate: '2009-12-31',
                  edgeId: 20003,
                },
              ],
              fullName: 'Parent node 1',
              language: 'fi',
            },
          ],
        }),
        mockSaveParents(),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Yläyksiköt')).toBeInTheDocument();
    });

    await expect(canvas.queryByText('Muokkaa')).not.toBeVisible();

    await expect(canvas.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  },
};

export const EditMode = {
  ...Default,
  play: async (context) => {
    await Default.play(context);

    const canvas = within(context.canvasElement);

    await userEvent.click(canvas.getByText('Muokkaa'));

    await waitFor(async () => {
      await expect(canvas.getByText('Tallenna')).toBeDisabled();
    });

    await expect(canvas.getByText('Parent node 1')).toBeInTheDocument();
    await expect(canvas.getByText('Parent node 2')).toBeInTheDocument();
  },
};

export const Modified = {
  ...EditMode,
  play: async (context) => {
    await EditMode.play(context);

    const canvas = within(context.canvasElement.parentElement);

    await userEvent.click(canvas.getAllByLabelText(/Hierarkia/)[0]);
    await userEvent.click(canvas.getAllByRole('option')[1]);
    await userEvent.type(
      canvas.getAllByLabelText('Voimassaolo päättyy')[0],
      '31.12.2023',
      { delay: 100 }
    );

    await waitFor(async () => {
      await expect(canvas.getByText('Tallenna')).toBeEnabled();
    });
  },
};

export const DeletedRow = {
  ...EditMode,
  play: async (context) => {
    await EditMode.play(context);

    const canvas = within(context.canvasElement.parentElement);

    await userEvent.click(canvas.getAllByLabelText(/Toiminnot/)[1]);
    await userEvent.click(canvas.getByText('Poista rivi'));
    await expect(
      canvas.getByText(
        'Poistettu: Viralliset yksiköt, voimassa 1.1.2000 alkaen'
      )
    ).toBeInTheDocument();

    // Deleted row appears with an animation, so wait for it before running
    // a11y tests
    await waitForAnimations();
  },
};
