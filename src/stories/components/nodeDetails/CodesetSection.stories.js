import { createNodeState, withMockStore } from '../../../mockStore';
import CodesetSection from '../../../components/nodeDetails/CodesetSection';

export default {
  component: CodesetSection,
};

export const Default = {
  decorators: [withMockStore({ nrd: createNodeState() })],
};
