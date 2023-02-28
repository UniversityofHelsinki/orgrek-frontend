import { withNode } from '../../../mockStore';
import SuccessorsSection from '../../../components/nodeDetails/SuccessorsSection';

export default {
  component: SuccessorsSection,
};

export const Default = {
  decorators: [
    withNode({
      nodeSuccessors: {
        fi: [
          {
            id: '1001',
            uniqueId: 10000001,
            startDate: '1970-01-01',
            endDate: '2017-05-05',
            hierarchy: null,
            edgeStartDate: '2017-05-06',
            edgeEndDate: '2024-12-31',
            fullName: 'Successor 1',
            language: 'fi',
          },
          {
            id: '1002',
            uniqueId: 10000002,
            startDate: '1970-01-01',
            endDate: null,
            hierarchy: null,
            edgeStartDate: null,
            edgeEndDate: null,
            fullName: 'Successor 2',
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
