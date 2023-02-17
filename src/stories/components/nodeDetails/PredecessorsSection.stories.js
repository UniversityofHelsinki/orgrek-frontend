import { createNodeState, withMockStore } from '../../../mockStore';
import PredecessorsSection from '../../../components/nodeDetails/PredecessorsSection';

export default {
  component: PredecessorsSection,
};

export const Default = {
  decorators: [withMockStore({ nrd: createNodeState() })],
};
