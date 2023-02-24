import React from 'react';
import NodeDetails from '../../../components/nodeDetails/NodeDetails2';
import {
  createAdmin,
  createNodeState,
  createReader,
  withMockStore,
} from '../../../mockStore';

export default {
  component: NodeDetails,
  parameters: {
    layout: 'fullscreen',
  },
};

export const AdminRole = {
  args: {},
  decorators: [
    withMockStore({ nrd: createNodeState(), ur: { user: createAdmin() } }),
  ],
};

export const ReaderRole = {
  args: {},
  decorators: [
    withMockStore({ nrd: createNodeState(), ur: { user: createReader() } }),
  ],
};
