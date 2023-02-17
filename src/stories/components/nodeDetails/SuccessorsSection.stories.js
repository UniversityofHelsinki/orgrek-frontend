import { createNodeState, withMockStore } from '../../../mockStore';
import SuccessorsSection from '../../../components/nodeDetails/SuccessorsSection';

export default {
  component: SuccessorsSection,
};

export const Default = {
  decorators: [withMockStore({ nrd: createNodeState() })],
};
