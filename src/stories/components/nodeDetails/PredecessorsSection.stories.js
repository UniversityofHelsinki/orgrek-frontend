import { withNode } from '../../../mockStore';
import PredecessorsSection from '../../../components/nodeDetails/PredecessorsSection';

export default {
  component: PredecessorsSection,
};

export const Default = {
  decorators: [
    withNode({
      nodePredecessors: {
        fi: [
          {
            id: '1001',
            uniqueId: 10000001,
            startDate: null,
            endDate: '2016-04-29',
            hierarchy: null,
            edgeStartDate: '2016-04-30',
            edgeEndDate: null,
            fullName: 'Rehtorin kanslia (H01A)',
            language: 'fi',
          },
        ],
      },
    }),
  ],
};

export const Empty = {
  decorators: [withNode()],
};
