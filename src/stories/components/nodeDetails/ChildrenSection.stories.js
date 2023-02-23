import ChildrenSection from '../../../components/nodeDetails/ChildrenSection';
import { createHierarchies, withHierarchy } from '../../../mockStore';

export default {
  component: ChildrenSection,
};

export const Default = {
  decorators: [
    withHierarchy({
      children: {
        fi: [
          {
            id: '1000',
            uniqueId: 1000000,
            startDate: null,
            endDate: null,
            hierarchies: createHierarchies(undefined, '1970-01-01'),
            fullName: 'Child node 1',
            language: 'fi',
          },
          {
            id: '1001',
            uniqueId: 1000001,
            startDate: null,
            endDate: null,
            hierarchies: createHierarchies(),
            fullName: 'Child node 2',
            language: 'fi',
          },
          {
            id: '1002',
            uniqueId: 1000002,
            startDate: null,
            endDate: null,
            hierarchies: createHierarchies(),
            fullName: 'Child node 3',
            language: 'fi',
          },
        ],
      },
    }),
  ],
};

export const Empty = {
  decorators: [withHierarchy({ children: {} })],
};
