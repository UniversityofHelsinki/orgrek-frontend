import TreeSearchComponent from '../../components/TreeSearch';
import { withMockStore } from '../../mockStore';

export default {
  component: TreeSearchComponent,
};

export const TreeSearch = {
  decorators: [withMockStore()],
};
