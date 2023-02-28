import { withNode } from '../../../mockStore';
import NodeValiditySection from '../../../components/nodeDetails/NodeValiditySection';

export default {
  component: NodeValiditySection,
};

export const Default = {
  decorators: [withNode({ node: { startDate: '2000-01-01' } })],
};

export const Empty = {
  decorators: [withNode()],
};
