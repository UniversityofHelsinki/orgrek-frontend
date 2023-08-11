import { expect } from '@storybook/jest';
import React from 'react';
import NodeDetails from '../../../components/nodeDetails/NodeDetails';
import {
  createAdmin,
  createNodeState,
  createReader,
  hierarchyFilters,
  mockGetAttributeKeys,
  mockGetChildren,
  mockGetFavorableFullNames,
  mockGetFullNames,
  mockGetNode,
  mockGetParents,
  mockGetPredecessors,
  mockGetSectionTypeAttributes,
  mockGetSuccessors,
  mockGetValidHierarchyFilters,
  mockPutNameAttributes,
  mockPutTypeAttributes,
  mockSaveCodeAttributes,
  mockGetNodeValidity,
  mockSaveNodeValidity,
  withMockStore,
  mockSaveParents,
  mockGetParentsDeprecated,
  mockSaveOtherAttributes,
  mockGetAllFullNames,
  mockGetAttributes,
} from '../../../mockStore';
import { waitFor, within } from '@storybook/testing-library';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const nodeId = '1';
const selectedHierarchy = 'virallinen';

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
  systemTime: now,
  parameters: {
    systemTime: now,
    reactRouter: {
      searchParams: {
        hierarchies: selectedHierarchy,
      },
    },
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
        mockGetSectionTypeAttributes('names', [
          {
            id: 14,
            section: 'names',
            attr: 'name_fi',
          },
          {
            id: 15,
            section: 'names',
            attr: 'name_sv',
          },
          {
            id: 16,
            section: 'names',
            attr: 'name_en',
          },
        ]),
        mockGetSectionTypeAttributes('types', [
          {
            id: 17,
            section: 'types',
            attr: 'type',
          },
        ]),
        mockGetAttributes(
          nodeId,
          {
            names: [
              {
                id: 4899999926,
                nodeId: '4820',
                key: 'name_fi',
                value: 'Tietotekniikkaratkaisut 1',
                startDate: '1999-12-31',
                endDate: null,
              },
              {
                id: 48111122,
                nodeId: '4820',
                key: 'name_sv',
                value: 'Datatekniklösningar',
                startDate: '1999-12-31',
                endDate: null,
              },
              {
                id: 480021,
                nodeId: '4820',
                key: 'name_en',
                value: 'IT Solutions 1',
                startDate: '1999-12-31',
                endDate: null,
              },
            ],
            codes: [
              {
                id: 4824,
                nodeId: '4820',
                key: 'virallinen_tunnus',
                value: 'H9073',
                startDate: null,
                endDate: null,
              },
              {
                id: 4823,
                nodeId: '4820',
                key: 'lyhenne',
                value: 'TIRA',
                startDate: null,
                endDate: null,
              },
              {
                id: 14528,
                nodeId: '4820',
                key: 'emo_lyhenne',
                value: 'TIKE',
                startDate: null,
                endDate: null,
              },
            ],
            types: [
              {
                id: 1,
                nodeId: '1',
                key: 'type',
                value: 'tulosyksikko',
                startDate: null,
                endDate: null,
              },
            ],
            other_attributes: [
              {
                id: 27788,
                nodeId: '4820',
                key: 'publicity',
                value: 'julkinen',
                startDate: null,
                endDate: null,
              },
            ],
          },
          now
        ),
        mockPutNameAttributes(nodeId),
        mockSaveCodeAttributes(nodeId),
        mockPutTypeAttributes(nodeId),
        mockGetAttributeKeys(
          {
            selectedHierarchies: selectedHierarchy,
            sections: ['codes'],
          },
          ['emo_lyhenne', 'lyhenne', 'virallinen_tunnus']
        ),
        mockGetAttributeKeys(
          {
            selectedHierarchies: selectedHierarchy,
            sections: ['types'],
          },
          ['type']
        ),
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
        mockGetAllFullNames(nodeId, {
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
        mockGetParents(nodeId, now, selectedHierarchy, [
          {
            node: {
              id: '1000',
              uniqueId: 1000000,
              startDate: '2009-01-01',
              endDate: null,
              name: 'Parent node 1',
              names: {
                fi: 'Parent node 1',
                sv: 'Parent node 1',
                en: 'Parent node 1',
              },
            },
            edges: [
              {
                hierarchy: 'virallinen',
                startDate: '2000-01-01',
                endDate: null,
                id: 20003,
              },
            ],
          },
          {
            node: {
              id: '1001',
              uniqueId: 1000001,
              startDate: null,
              endDate: null,
              name: 'Parent node 2',
              names: {
                fi: 'Parent node 2',
                sv: 'Parent node 2',
                en: 'Parent node 2',
              },
            },
            edges: [
              {
                hierarchy: 'virallinen',
                startDate: '2000-01-01',
                endDate: null,
                id: 20004,
              },
            ],
          },
        ]),
        mockSaveParents(),
        mockGetChildren(nodeId, now, selectedHierarchy, []),
        mockGetPredecessors(nodeId, now, []),
        mockGetSuccessors(nodeId, now, []),
        mockSaveOtherAttributes(nodeId),
        mockGetAttributeKeys(
          {
            selectedHierarchies: selectedHierarchy,
            sections: ['other_attributes'],
          },
          ["'publicity'"]
        ),
        mockGetNodeValidity(nodeId, {
          nodeId: '4820',
          startDate: null,
          endDate: null,
        }),
        mockSaveNodeValidity(nodeId),
        mockGetParentsDeprecated(nodeId, now, selectedHierarchy, {}),
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
      expect(canvas.getByText('Nimitiedot')).toBeInTheDocument();
    });
    expect(canvas.getByText('Tietotekniikkaratkaisut 1')).toBeInTheDocument();

    await waitFor(async () => {
      expect(canvas.getByText('Koko nimi')).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(canvas.getByText('TIKE, IT Solutions (TIRA)')).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(canvas.getByText('Koodisto')).toBeInTheDocument();
    });
    expect(canvas.getByText('H9073')).toBeInTheDocument();

    await waitFor(async () => {
      expect(canvas.getByText('Tulosyksikkö')).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(canvas.getByText('Yläyksiköt')).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(canvas.getByText('Alayksiköt')).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(canvas.getByText('Edeltävät yksiköt')).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(canvas.getByText('Seuraavat yksiköt')).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(canvas.getByText('Muut attribuutit')).toBeInTheDocument();
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
  play: async (context) => {
    await AdminRole.play(context);

    const canvas = within(context.canvasElement);

    expect(canvas.queryAllByText('Muokkaa')).toHaveLength(0);
  },
};
