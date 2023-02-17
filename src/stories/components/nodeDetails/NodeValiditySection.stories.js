import { createNodeState, withMockStore } from '../../../mockStore';
import NodeValiditySection from '../../../components/nodeDetails/NodeValiditySection';

export default {
  component: NodeValiditySection,
};

export const Default = {
  decorators: [withMockStore({ nrd: createNodeState() })],
};
