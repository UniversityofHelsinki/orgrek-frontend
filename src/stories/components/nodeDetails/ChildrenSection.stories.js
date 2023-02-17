import ChildrenSection from '../../../components/nodeDetails/ChildrenSection';
import { createNodeState, withMockStore } from '../../../mockStore';

export default {
  component: ChildrenSection,
};

export const Default = {
  decorators: [withMockStore({ nrd: createNodeState() })],
};
