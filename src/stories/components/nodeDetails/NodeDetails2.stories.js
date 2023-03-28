import React from 'react';
import NodeDetails from '../../../components/nodeDetails/NodeDetails2';
import {
  createAdmin,
  createNodeState,
  createReader,
  mockGetNameAttributes,
  mockPutNameAttributes,
  withMockStore,
} from '../../../mockStore';

const nodeId = '1';

export default {
  component: NodeDetails,
  parameters: {
    layout: 'fullscreen',
    reactRouter: {
      searchParams: {
        uid: nodeId,
      },
    },
  },
};

export const AdminRole = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        mockGetNameAttributes(nodeId, [
          {
            id: 4899999926,
            nodeId: '4820',
            key: 'name_fi',
            value: 'Tietotekniikkaratkaisut 1',
            startDate: null,
            endDate: '1999-12-31',
          },
          {
            id: 48111122,
            nodeId: '4820',
            key: 'name_sv',
            value: 'Datatekniklösningar',
            startDate: null,
            endDate: null,
          },
          {
            id: 480021,
            nodeId: '4820',
            key: 'name_en',
            value: 'IT Solutions 1',
            startDate: null,
            endDate: '1999-12-31',
          },
        ]),
        mockPutNameAttributes(),
      ],
    },
  },
  decorators: [
    withMockStore({ nrd: createNodeState(), ur: { user: createAdmin() } }),
  ],
};

export const ReaderRole = {
  ...AdminRole,
  decorators: [
    withMockStore({ nrd: createNodeState(), ur: { user: createReader() } }),
  ],
};
