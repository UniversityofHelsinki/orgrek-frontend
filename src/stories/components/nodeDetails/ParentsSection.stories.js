import ParentsSection from '../../../components/nodeDetails/ParentsSection';
import {
  mockGetParents,
  mockSaveParents,
  withMockStore,
} from '../../../mockStore';
import { userEvent, waitFor, within } from '@storybook/test';
import { expect } from '@storybook/test';
import { waitForAnimations } from '../../storyUtils';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const nodeId = '1';
const selectedHierarchy = 'virallinen,toiminnanohjaus';

const parents = [
  {
    node: {
      id: '1000',
      uniqueId: 1000000,
      startDate: '2009-01-01',
      endDate: null,
      name: 'Parent node 1',
      names: {
        fi: 'Parent node 1',
        sv: 'Parent node 1',
        en: 'Parent node 1',
      },
    },
    edges: [
      {
        id: 20003,
        parentNodeId: '1000',
        childNodeId: '1',
        startDate: '2000-01-01',
        endDate: null,
        hierarchy: 'virallinen',
      },
      {
        id: 20004,
        parentNodeId: '1000',
        childNodeId: '1',
        startDate: '2000-01-01',
        endDate: null,
        hierarchy: 'toiminnanohjaus',
      },
    ],
  },
  {
    node: {
      id: '1001',
      uniqueId: 1000001,
      startDate: null,
      endDate: null,
      name: 'Parent node 2',
      names: {
        fi: 'Parent node 2',
        en: 'Parent node 2',
        sv: 'Parent node 2',
      },
    },
    edges: [
      {
        id: 20004,
        hierarchy: 'virallinen',
        startDate: '2000-01-01',
        endDate: null,
      },
      {
        id: 20005,
        hierarchy: 'toiminnanohjaus',
        startDate: '2000-01-01',
        endDate: null,
      },
    ],
  },
];

const oldParent = [
  {
    node: {
      id: '1001',
      uniqueId: 1000000,
      startDate: '2009-01-01',
      endDate: null,
      name: 'Parent node 1',
      names: {
        fi: 'Parent node 1',
        sv: 'Parent node 1',
        en: 'Parent node 1',
      },
    },
    edges: [
      {
        hierarchy: 'virallinen',
        startDate: '2000-01-01',
        endDate: '2009-12-31',
        id: 20003,
      },
    ],
  },
];

export default {
  component: ParentsSection,
  parameters: {
    systemTime: now,
    reactRouter: {
      searchParams: {
        uid: nodeId,
        hierarchies: selectedHierarchy,
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
        mockGetParents(nodeId, now, selectedHierarchy, parents),
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
        mockGetParents(nodeId, now, selectedHierarchy, oldParent),
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
      canvas.getByText('Poistettu: toiminnanohjaus, voimassa 1.1.2000 alkaen')
    ).toBeInTheDocument();

    // Deleted row appears with an animation, so wait for it before running
    // a11y tests
    await waitForAnimations();
  },
};
