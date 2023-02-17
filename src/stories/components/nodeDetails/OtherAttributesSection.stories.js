import { createNodeState, withMockStore } from '../../../mockStore';
import OtherAttributesSection from '../../../components/nodeDetails/OtherAttributesSection';

export default {
  component: OtherAttributesSection,
};

export const Default = {
  decorators: [withMockStore({ nrd: createNodeState() })],
};
