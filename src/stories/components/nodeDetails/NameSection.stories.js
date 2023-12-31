import {
  mockGetAttributes,
  mockGetSectionTypeAttributes,
  mockPutNameAttributes,
  withMockStore,
} from '../../../mockStore';
import NameSection from '../../../components/nodeDetails/NameSection';
import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/testing-library';

const nodeId = '1';
const hierarchies = 'virallinen';

const data = {
  names: [
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
      id: 48246,
      key: 'name_fi',
      value: 'Tietotekniikkaratkaisut 3',
      startDate: '2023-01-01',
      endDate: null,
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
      id: 4899999926,
      key: 'name_fi',
      value: 'Tietotekniikkaratkaisut 1',
      startDate: '1970-01-01',
      endDate: '1999-12-31',
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
      id: 4821989,
      key: 'name_en',
      value: 'IT Solutions 3',
      startDate: '2023-01-01',
      endDate: null,
      isNew: false,
      deleted: false,
    },
  ],
};

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
        hierarchies,
      },
    },
  },
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        mockGetAttributes(nodeId, data),
        mockPutNameAttributes(nodeId),
      ],
    },
  },
  decorators: [withMockStore()],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(
        canvas.getByText('Tietotekniikkaratkaisut 3')
      ).toBeInTheDocument();
    });
  },
};

export const Empty = {
  parameters: {
    msw: {
      handlers: [
        mockGetAttributes(nodeId, { names: [] }),
        mockPutNameAttributes(nodeId),
        mockGetSectionTypeAttributes('names', sectionTypeData),
      ],
    },
  },
  decorators: [withMockStore()],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Nimitiedot')).toBeInTheDocument();
    });

    await expect(canvas.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  },
};

export const ShowHistory = {
  decorators: [withMockStore()],
  parameters: {
    msw: {
      handlers: [
        mockGetAttributes(nodeId, data),
        mockPutNameAttributes(nodeId),
        mockGetSectionTypeAttributes('names', sectionTypeData),
      ],
    },
  },
  args: {
    showHistory: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(
        canvas.getByText('Tietotekniikkaratkaisut 3')
      ).toBeInTheDocument();
    });
    await expect(
      canvas.getByText('Tietotekniikkaratkaisut 2')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Tietotekniikkaratkaisut 1')
    ).toBeInTheDocument();
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
  },
};

export const Modified = {
  ...EditMode,
  play: async (context) => {
    await EditMode.play(context);

    const canvas = within(context.canvasElement);

    await userEvent.type(canvas.getAllByRole('textbox')[2], '31.12.2023');

    await expect(canvas.getByText('Tallenna')).toBeEnabled();

    await waitFor(async () => {
      await expect(canvas.getByText('Tallenna')).toHaveStyle('color: #ffffff');
    });
  },
};
