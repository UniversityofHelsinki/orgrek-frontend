import { createNodeState, withMockStore } from '../../../mockStore';
import ParentsSection from '../../../components/nodeDetails/ParentsSection';

export default {
  component: ParentsSection,
};

export const Default = {
  decorators: [withMockStore({ nrd: createNodeState() })],
};
