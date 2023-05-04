import {
  hierarchyFilters,
  mockGetSectionTypeAttributes,
  mockGetTypeAttributes,
  mockGetValidHierarchyFilters,
  mockPutTypeAttributes,
  withMockStore,
} from '../../../mockStore';
import UnitTypeSection from '../../../components/nodeDetails/UnitTypeSection';

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
    msw: {
      handlers: [
        mockGetTypeAttributes(nodeId, [
          {
            id: 1,
            nodeId: '1',
            key: 'type',
            value: 'tiedekunta',
            startDate: null,
            endDate: null,
          },
        ]),
        mockPutTypeAttributes(nodeId),
        mockGetValidHierarchyFilters(now, hierarchyFilters),
        mockGetSectionTypeAttributes('types', sectionTypeData),
      ],
    },
  },
  decorators: [withMockStore({ tree: { selectedHierarchy: 'opetus' } })],
};

export const Empty = {
  ...Default,
  parameters: {
    msw: {
      handlers: [
        mockGetTypeAttributes(nodeId, []),
        mockPutTypeAttributes(nodeId),
        mockGetValidHierarchyFilters(now, hierarchyFilters),
        mockGetSectionTypeAttributes('types', sectionTypeData),
      ],
    },
  },
};
