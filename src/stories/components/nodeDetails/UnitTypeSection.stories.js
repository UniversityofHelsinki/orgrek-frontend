import {
  hierarchyFilters,
  mockGetAttributes,
  mockGetSectionTypeAttributes,
  mockGetTypeAttributes,
  mockGetValidHierarchyFilters,
  mockPutTypeAttributes,
  withMockStore,
} from '../../../mockStore';
import UnitTypeSection from '../../../components/nodeDetails/UnitTypeSection';
import { waitFor, within } from '@storybook/test';
import { expect } from '@storybook/test';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const nodeId = '1';

export default {
  component: UnitTypeSection,
  parameters: {
    systemTime: now,
    reactRouter: {
      searchParams: {
        uid: nodeId,
        hierarchies: 'virallinen',
      },
    },
  },
};

const sectionTypeData = [
  {
    id: 17,
    section: 'types',
    attr: 'type',
  },
];

export const Default = {
  parameters: {
    systemTime: now,
    msw: {
      handlers: [
        mockGetAttributes(nodeId, {
          types: [
            {
              id: 1,
              nodeId: '1',
              key: 'type',
              value: 'tiedekunta',
              startDate: null,
              endDate: null,
            },
          ],
        }),
        mockPutTypeAttributes(nodeId),
        mockGetValidHierarchyFilters(now, hierarchyFilters),
        mockGetSectionTypeAttributes('types', sectionTypeData),
      ],
    },
  },
  decorators: [withMockStore({ tree: { selectedHierarchy: 'virallinen' } })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('tiedekunta')).toBeInTheDocument();
    });
  },
};

export const Empty = {
  ...Default,
  parameters: {
    msw: {
      handlers: [
        mockGetAttributes(nodeId, { types: [] }),
        mockPutTypeAttributes(nodeId),
        mockGetValidHierarchyFilters(now, hierarchyFilters),
        mockGetSectionTypeAttributes('types', sectionTypeData),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Yksikön tyyppi')).toBeInTheDocument();
    });

    await expect(canvas.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  },
};
