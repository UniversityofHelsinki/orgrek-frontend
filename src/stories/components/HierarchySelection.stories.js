import HierarchySelection from '../../components/HierarchySelection';
import { withMockStore } from '../../mockStore';

export default {
  component: HierarchySelection,
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
  },
};

export const Default = {
  args: {
    size: 'medium',
  },
  decorators: [
    withMockStore({
      tree: {
        selectedHierarchy: 'virallinen',
        selectableHierarchies: [
          'tutkimus',
          'henkilosto',
          'toiminnanohjaus',
          'opetus',
          'history',
          'talous',
          'virallinen',
        ],
      },
    }),
  ],
};

export const Small = {
  ...Default,
  args: {
    ...Default.args,
    size: 'small',
  },
};
