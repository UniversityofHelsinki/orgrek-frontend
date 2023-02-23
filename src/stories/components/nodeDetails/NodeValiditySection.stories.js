import { createNodeState, withMockStore } from '../../../mockStore';
import NodeValiditySection from '../../../components/nodeDetails/NodeValiditySection';

export default {
  component: NodeValiditySection,
};

export const Default = {
  decorators: [
    withMockStore({
      nrd: createNodeState({ node: { startDate: '2000-01-01' } }),
    }),
  ],
};

export const Empty = {
  decorators: [withMockStore({ nrd: createNodeState() })],
};
