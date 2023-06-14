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
  mockGetCodeAttributes,
  mockGetFavorableFullNames,
  mockGetFullNames,
  mockGetNameAttributes,
  mockGetNode,
  mockGetParents,
  mockGetPredecessors,
  mockGetSectionTypeAttributes,
  mockGetSuccessors,
  mockGetTypeAttributes,
  mockGetValidHierarchyFilters,
  mockPutNameAttributes,
  mockPutTypeAttributes,
  mockSaveCodeAttributes,
  mockGetNodeValidity,
  mockSaveNodeValidity,
  withMockStore,
  mockSaveParents,
  mockGetParentsDeprecated,
  mockGetOtherAttributes,
  mockSaveOtherAttributes,
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
        mockGetNameAttributes(nodeId, [
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
        ]),
        mockPutNameAttributes(nodeId),
        mockGetCodeAttributes(nodeId, [
          {
            id: 4824,
            nodeId: '4820',
            key: 'talous_tunnus',
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
        ]),
        mockSaveCodeAttributes(nodeId),
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
        mockGetAttributeKeys(
          {
            selectedHierarchies: selectedHierarchy,
            sections: ['codes'],
          },
          ['emo_lyhenne', 'lyhenne', 'talous_tunnus']
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
        mockGetParents(nodeId, now, selectedHierarchy, {
          fi: [
            {
              id: '1000',
              edgeId: 20001,
              uniqueId: 1000000,
              startDate: '2009-01-01',
              endDate: null,
              hierarchies: [
                {
                  hierarchy: 'talous',
                  startDate: '2000-01-01',
                  endDate: null,
                  edgeId: 20003,
                },
              ],
              fullName: 'Parent node 1',
              language: 'fi',
            },
            {
              id: '1001',
              edgeId: 20002,
              uniqueId: 1000001,
              startDate: null,
              endDate: null,
              hierarchies: [
                {
                  hierarchy: 'talous',
                  startDate: '2000-01-01',
                  endDate: null,
                  edgeId: 20004,
                },
              ],
              fullName: 'Parent node 2',
              language: 'fi',
            },
          ],
        }),
        mockSaveParents(),
        mockGetChildren(nodeId, now, selectedHierarchy, {
          fi: [],
          sv: [],
          en: [],
        }),
        mockGetPredecessors(nodeId, now, {
          sv: [],
          fi: [],
          en: [],
        }),
        mockGetSuccessors(nodeId, {
          sv: [],
          fi: [],
          en: [],
        }),
        mockGetOtherAttributes(nodeId, selectedHierarchy, [
          {
            id: 27788,
            nodeId: '4820',
            key: 'publicity',
            value: 'julkinen',
            startDate: null,
            endDate: null,
          },
        ]),
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
    expect(canvas.getByText('TIKE, IT Solutions (TIRA)')).toBeInTheDocument();

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
