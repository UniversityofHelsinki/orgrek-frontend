import { createNodeState, withMockStore } from '../../../mockStore';
import DisplayNameSection from '../../../components/nodeDetails/DisplayNameSection';

export default {
  component: DisplayNameSection,
};

export const Default = {
  decorators: [withMockStore({ nrd: createNodeState() })],
};
