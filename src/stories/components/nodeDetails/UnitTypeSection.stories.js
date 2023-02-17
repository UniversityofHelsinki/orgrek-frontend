import { createNodeState, withMockStore } from '../../../mockStore';
import UnitTypeSection from '../../../components/nodeDetails/UnitTypeSection';

export default {
  component: UnitTypeSection,
};

export const Default = {
  decorators: [withMockStore({ nrd: createNodeState() })],
};
