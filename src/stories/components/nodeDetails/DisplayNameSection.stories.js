import { withNode } from '../../../mockStore';
import DisplayNameSection from '../../../components/nodeDetails/DisplayNameSection';

export default {
  component: DisplayNameSection,
};

export const Default = {
  decorators: [withNode()],
};

export const Empty = {
  decorators: [withNode({ nodeDisplayNames: {} })],
};

export const ShowHistory = {
  decorators: [
    withNode({
      nodeDisplayNames: {
        fi: [
          {
            nodeId: 'a1',
            language: 'fi',
            name: 'Helsingin yliopisto (HY)',
            startDate: '1919-02-17',
            endDate: null,
          },
          {
            nodeId: 'a1',
            language: 'fi',
            name: 'Keisarillinen Aleksanterin Yliopisto (HY)',
            startDate: '1828-01-01',
            endDate: '1919-02-16',
          },
          {
            nodeId: 'a1',
            language: 'fi',
            name: 'Kuninkaallinen Turun Akatemia (HY)',
            startDate: '1640-03-25',
            endDate: '1827-12-31',
          },
        ],
        sv: [
          {
            nodeId: 'a1',
            language: 'sv',
            name: 'Helsingfors universitet (HY)',
            startDate: null,
            endDate: null,
          },
        ],
        en: [
          {
            nodeId: 'a1',
            language: 'en',
            name: 'University of Helsinki (HY)',
            startDate: null,
            endDate: null,
          },
        ],
      },
    }),
  ],
};
