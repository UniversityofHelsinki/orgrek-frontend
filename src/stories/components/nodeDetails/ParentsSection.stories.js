import ParentsSection from '../../../components/nodeDetails/ParentsSection';
import { createHierarchies, withHierarchy } from '../../../mockStore';

export default {
  component: ParentsSection,
};

export const Default = {
  decorators: [
    withHierarchy({
      parents: {
        fi: [
          {
            id: '1000',
            uniqueId: 1000000,
            startDate: null,
            endDate: null,
            hierarchies: createHierarchies(null, '1970-01-01'),
            fullName: 'Parent node 1',
            language: 'fi',
          },
          {
            id: '1001',
            uniqueId: 1000001,
            startDate: null,
            endDate: null,
            hierarchies: createHierarchies(['tutkimus', 'opetus']),
            fullName: 'Parent node 2',
            language: 'fi',
          },
        ],
      },
    }),
  ],
};

export const Empty = {
  decorators: [withHierarchy({ parents: {} })],
};
