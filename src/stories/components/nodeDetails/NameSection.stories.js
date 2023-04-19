import {
  mockGetNameAttributes,
  mockPutNameAttributes,
  withMockStore,
} from '../../../mockStore';
import NameSection from '../../../components/nodeDetails/NameSection';
import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/testing-library';

const nodeId = '1';

const data = [
  {
    id: 4899999926,
    key: 'name_fi',
    value: 'Tietotekniikkaratkaisut 1',
    startDate: '1970-01-01',
    endDate: '1999-12-31',
    isNew: false,
    deleted: false,
  },
  {
    id: 48111122,
    key: 'name_sv',
    value: 'Datatekniklösningar',
    startDate: '1970-01-01',
    endDate: null,
    isNew: false,
    deleted: false,
  },
  {
    id: 480021,
    key: 'name_en',
    value: 'IT Solutions 1',
    startDate: '1970-01-01',
    endDate: '1999-12-31',
    isNew: false,
    deleted: false,
  },
  {
    id: 4856726,
    key: 'name_fi',
    value: 'Tietotekniikkaratkaisut 2',
    startDate: '2000-01-01',
    endDate: '2022-12-31',
    isNew: false,
    deleted: false,
  },
  {
    id: 44821,
    key: 'name_en',
    value: 'IT Solutions 2',
    startDate: '2000-01-01',
    endDate: '2022-12-31',
    isNew: false,
    deleted: false,
  },
  {
    id: 48246,
    key: 'name_fi',
    value: 'Tietotekniikkaratkaisut 3',
    startDate: '2023-01-01',
    endDate: null,
    isNew: false,
    deleted: false,
  },
  {
    id: 4821989,
    key: 'name_en',
    value: 'IT Solutions 3',
    startDate: '2023-01-01',
    endDate: null,
    isNew: false,
    deleted: false,
  },
];

export default {
  component: NameSection,
  parameters: {
    reactRouter: {
      searchParams: {
        uid: nodeId,
      },
    },
  },
};

export const Default = {
  parameters: {
    msw: {
      handlers: [mockGetNameAttributes(nodeId, data), mockPutNameAttributes()],
    },
  },
  decorators: [withMockStore()],
};

export const Empty = {
  parameters: {
    msw: {
      handlers: [mockGetNameAttributes(nodeId, []), mockPutNameAttributes()],
    },
  },
  decorators: [withMockStore()],
};

export const ShowHistory = {
  parameters: {
    msw: {
      handlers: [mockGetNameAttributes(nodeId, data), mockPutNameAttributes()],
    },
  },
  decorators: [
    withMockStore({
      nvrd: {
        showHistory: true,
      },
    }),
  ],
};

export const EditMode = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByTestId('editButton')).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId('editButton'));
  },
};

export const Modified = {
  ...EditMode,
  play: async (context) => {
    await EditMode.play(context);

    const canvas = within(context.canvasElement);

    await userEvent.type(canvas.getAllByRole('textbox')[2], '31.12.2023');
  },
};
