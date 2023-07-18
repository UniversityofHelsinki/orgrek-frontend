import TreeSearchComponent from '../../components/TreeSearch';
import { mockGetTree, tree, withMockStore } from '../../mockStore';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const selectedHierarchy = 'virallinen';

export default {
  component: TreeSearchComponent,
  parameters: {
    systemTime: now,
    reactRouter: {
      searchParams: {
        uid: '1',
        hierarchies: selectedHierarchy,
      },
    },
  },
};

export const TreeSearch = {
  parameters: {
    msw: {
      handlers: [
        mockGetTree({ hierarchies: selectedHierarchy, selectedDay: now }, tree),
      ],
    },
  },
  decorators: [
    withMockStore({
      dr: {
        selectedDay: now,
      },
      tree: {
        selectedHierarchy,
      },
    }),
  ],
};
