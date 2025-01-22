import ChildrenSection from '../../../components/nodeDetails/ChildrenSection';
import {
  mockGetChildren,
  mockSaveChildren,
  withMockStore,
} from '../../../mockStore';
import { userEvent, waitFor, within } from '@storybook/test';
import { expect } from '@storybook/test';
import { waitForAnimations } from '../../storyUtils';

const now = new Date('2023-03-22T14:28:00+0200');
const nodeId = '1';
const selectedHierarchy = 'virallinen,toiminnanohjaus';

const children = [
  {
    node: {
      id: '1000',
      uniqueId: 1000000,
      startDate: null,
      endDate: null,
      name: 'Child node 1',
      names: {
        fi: 'Child node 1',
        en: 'Child node 1',
        sv: 'Child node 1',
      },
    },
    edges: [
      {
        hierarchy: 'virallinen',
        startDate: '2000-01-01',
        endDate: null,
        id: 20003,
      },
      {
        hierarchy: 'toiminnanohjaus',
        startDate: '2000-01-01',
        endDate: null,
        id: 20004,
      },
    ],
  },
  {
    node: {
      id: '1001',
      uniqueId: 1000001,
      startDate: null,
      endDate: null,
      name: 'Child node 2',
      names: {
        fi: 'Child node 2',
        sv: 'Child node 2',
        en: 'Child node 2',
      },
    },
    edges: [
      {
        hierarchy: 'virallinen',
        startDate: '2000-01-01',
        endDate: null,
        id: 20004,
      },
      {
        hierarchy: 'toiminnanohjaus',
        startDate: '2000-01-01',
        endDate: null,
        id: 20005,
      },
    ],
  },
  {
    node: {
      id: '1002',
      uniqueId: 1000002,
      startDate: null,
      endDate: null,
      name: 'Child node 3',
      names: {
        fi: 'Child node 3',
        sv: 'Child node 3',
        en: 'Child node 3',
      },
    },
    edges: [
      {
        hierarchy: 'virallinen',
        startDate: '2000-01-01',
        endDate: null,
        id: 20005,
      },
      {
        hierarchy: 'toiminnanohjaus',
        startDate: '2000-01-01',
        endDate: null,
        id: 20006,
      },
    ],
  },
];

const oldChild = [
  {
    node: {
      id: '1000',
      uniqueId: 1000000,
      startDate: '2009-01-01',
      endDate: null,
      name: 'Child node 1',
      names: {
        fi: 'Child node 1',
        sv: 'Child node 1',
        en: 'Child node 1',
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
  component: ChildrenSection,
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
        mockGetChildren(nodeId, now, selectedHierarchy, children),
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
  parameters: {
    msw: {
      handlers: [
        mockGetChildren(nodeId, now, selectedHierarchy, oldChild),
        mockSaveChildren(),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Alayksiköt')).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByText('Alayksiköt'));

    await expect(canvas.queryByText('Uusi alayksikkö')).toBeVisible();
    await expect(canvas.queryByText('Muokkaa')).toBeVisible();
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

    await expect(canvas.getByText('Child node 1')).toBeInTheDocument();
    await expect(canvas.getByText('Child node 2')).toBeInTheDocument();
    await expect(canvas.getByText('Child node 3')).toBeInTheDocument();
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
