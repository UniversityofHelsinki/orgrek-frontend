import HierarchySelectionComponent from '../../components/HierarchySelection';
import { withMockStore } from '../../mockStore';

export default {
  component: HierarchySelectionComponent,
};

export const HierarchySelection = {
  decorators: [
    withMockStore({
      tree: {
        selectedHierarchy: 'talous',
        selectableHierarchies: [
          'tutkimus',
          'henkilosto',
          'toiminnanohjaus',
          'opetus',
          'history',
          'talous',
        ],
      },
    }),
  ],
};
