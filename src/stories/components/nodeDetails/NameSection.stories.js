import {
  mockGetNameAttributes,
  mockGetSectionTypeAttributes,
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
    nodeId: '4820',
    key: 'name_fi',
    value: 'Tietotekniikkaratkaisut 1',
    startDate: null,
    endDate: '1999-12-31',
  },
  {
    id: 48111122,
    nodeId: '4820',
    key: 'name_sv',
    value: 'Datatekniklösningar',
    startDate: null,
    endDate: null,
  },
  {
    id: 480021,
    nodeId: '4820',
    key: 'name_en',
    value: 'IT Solutions 1',
    startDate: null,
    endDate: '1999-12-31',
  },
  {
    id: 4856726,
    nodeId: '4820',
    key: 'name_fi',
    value: 'Tietotekniikkaratkaisut 2',
    startDate: '2000-01-01',
    endDate: '2022-12-31',
  },
  {
    id: 44821,
    nodeId: '4820',
    key: 'name_en',
    value: 'IT Solutions 2',
    startDate: '2000-01-01',
    endDate: '2022-12-31',
  },
  {
    id: 48246,
    nodeId: '4820',
    key: 'name_fi',
    value: 'Tietotekniikkaratkaisut 3',
    startDate: '2023-01-01',
    endDate: null,
  },
  {
    id: 4821989,
    nodeId: '4820',
    key: 'name_en',
    value: 'IT Solutions 3',
    startDate: '2023-01-01',
    endDate: null,
  },
];

const sectionTypeData = [
  {
    id: 14,
    section: 'names',
    attr: 'name_fi',
  },
  {
    id: 15,
    section: 'names',
    attr: 'name_sv',
  },
  {
    id: 16,
    section: 'names',
    attr: 'name_en',
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
      handlers: [
        mockGetNameAttributes(nodeId, data),
        mockPutNameAttributes(),
        mockGetSectionTypeAttributes('names', sectionTypeData),
      ],
    },
  },
  decorators: [withMockStore()],
};

export const Empty = {
  parameters: {
    msw: {
      handlers: [
        mockGetNameAttributes(nodeId, []),
        mockPutNameAttributes(),
        mockGetSectionTypeAttributes('names', sectionTypeData),
      ],
    },
  },
  decorators: [withMockStore()],
};

export const ShowHistory = {
  parameters: {
    msw: {
      handlers: [
        mockGetNameAttributes(nodeId, data),
        mockPutNameAttributes(),
        mockGetSectionTypeAttributes('names', sectionTypeData),
      ],
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
