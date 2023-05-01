import NodeFieldComponent from '../../../components/inputs/NodeField';
import { mockGetTree, withMockStore, tree } from '../../../mockStore';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const selectedHierarchy = 'talous';

export default {
  component: NodeFieldComponent,
  parameters: {
    systemTime: now,
  },
};

export const NodeField = {
  args: {
    freeSolo: false,
    label: 'Label',
    placeholder: '',
  },
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
