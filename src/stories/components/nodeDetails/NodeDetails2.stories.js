import { expect } from '@storybook/jest';
import React from 'react';
import NodeDetails from '../../../components/nodeDetails/NodeDetails2';
import {
  createAdmin,
  createNodeState,
  createReader,
  hierarchyFilters,
  mockGetAttributes,
  mockGetChildren,
  mockGetFavorableFullNames,
  mockGetFullNames,
  mockGetNameAttributes,
  mockGetNode,
  mockGetParents,
  mockGetPredecessors,
  mockGetSuccessors,
  mockGetTypeAttributes,
  mockGetValidHierarchyFilters,
  mockPutNameAttributes,
  mockPutTypeAttributes,
  withMockStore,
} from '../../../mockStore';
import { waitFor, within } from '@storybook/testing-library';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const nodeId = '1';
const selectedHierarchy = 'talous';

export default {
  component: NodeDetails,
  parameters: {
    layout: 'fullscreen',
    systemTime: now,
    reactRouter: {
      searchParams: {
        uid: nodeId,
      },
    },
  },
};

export const AdminRole = {
  parameters: {
    msw: {
      handlers: [
        mockGetNode(nodeId, {
          id: '4820',
          name: 'TIKE, Tietotekniikkaratkaisut (TIRA)',
          startDate: null,
          endDate: null,
          timestamp: '2022-01-18T15:39:54.603+00:00',
          uniqueId: nodeId,
        }),
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
        mockGetTypeAttributes(nodeId, [
          {
            id: 1,
            nodeId: '1',
            key: 'type',
            value: 'tulosyksikko',
            startDate: null,
            endDate: null,
          },
        ]),
        mockPutTypeAttributes(nodeId),
        mockGetValidHierarchyFilters(now, hierarchyFilters),
        mockGetFullNames(nodeId, now, {
          sv: [
            {
              nodeId: '4820',
              language: 'sv',
              name: 'TIKE, Datatekniklösningar (TIRA)',
              startDate: null,
              endDate: null,
            },
          ],
          fi: [
            {
              nodeId: '4820',
              language: 'fi',
              name: 'TIKE, Tietotekniikkaratkaisut (TIRA)',
              startDate: null,
              endDate: null,
            },
          ],
          en: [
            {
              nodeId: '4820',
              language: 'en',
              name: 'TIKE, IT Solutions (TIRA)',
              startDate: null,
              endDate: null,
            },
          ],
        }),
        mockGetFavorableFullNames(nodeId, now, {
          sv: [
            {
              nodeId: '4820',
              language: 'sv',
              name: 'TIKE, Datatekniklösningar (TIRA)',
              startDate: null,
              endDate: null,
            },
          ],
          fi: [
            {
              nodeId: '4820',
              language: 'fi',
              name: 'TIKE, Tietotekniikkaratkaisut (TIRA)',
              startDate: null,
              endDate: null,
            },
          ],
          en: [
            {
              nodeId: '4820',
              language: 'en',
              name: 'TIKE, IT Solutions (TIRA)',
              startDate: null,
              endDate: null,
            },
          ],
        }),
        mockGetParents(nodeId, now, { fi: [], sv: [], en: [] }),
        mockGetChildren(nodeId, now, { fi: [], sv: [], en: [] }),
        mockGetPredecessors(nodeId, now, {
          sv: [],
          fi: [],
          en: [],
        }),
        mockGetSuccessors(nodeId, now, {
          sv: [],
          fi: [],
          en: [],
        }),
        // Remove after all sections have been migrated to RTK Query
        mockGetAttributes(nodeId, now, selectedHierarchy, [
          {
            id: 27788,
            nodeId: '4820',
            key: 'publicity',
            value: 'julkinen',
            startDate: null,
            endDate: null,
          },
        ]),
      ],
    },
  },
  decorators: [
    withMockStore({
      dr: { selectedDay: now },
      nrd: createNodeState({
        node: { uniqueId: nodeId },
      }),
      tree: { selectedHierarchy },
      ur: { user: createAdmin() },
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      expect(canvas.getAllByTestId('attributesTable')).toHaveLength(5);
    });
  },
};

export const ReaderRole = {
  ...AdminRole,
  decorators: [
    withMockStore({
      dr: { selectedDay: now },
      nrd: createNodeState({
        node: { uniqueId: nodeId },
      }),
      tree: { selectedHierarchy },
      ur: { user: createReader() },
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      expect(canvas.getAllByTestId('attributesTable')).toHaveLength(5);
    });
  },
};
