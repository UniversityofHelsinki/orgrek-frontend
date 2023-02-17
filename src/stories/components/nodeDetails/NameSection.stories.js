import { createNodeState, withMockStore } from '../../../mockStore';
import NameSection from '../../../components/nodeDetails/NameSection';

export default {
  component: NameSection,
};

export const Default = {
  decorators: [withMockStore({ nrd: createNodeState() })],
};
