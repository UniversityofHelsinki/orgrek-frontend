import { withNode } from '../../../mockStore';
import UnitTypeSection from '../../../components/nodeDetails/UnitTypeSection';

export default {
  component: UnitTypeSection,
};

export const Default = {
  decorators: [
    withNode({
      nodeAttributes: [
        {
          id: 1001,
          nodeId: '1',
          key: 'type',
          value: 'tiedekunta',
          startDate: null,
          endDate: null,
        },
      ],
    }),
  ],
};

export const Empty = {
  decorators: [withNode({ nodeAttributes: [] })],
};
