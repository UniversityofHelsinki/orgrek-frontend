/**
 * @deprecated not needed after everything has been migrated to RTK Query
 */
export const createNodeState = ({
  node,
  nodeAttributes,
  nodeAttributesHistory,
  nodeAttributesFuture,
  nodePredecessors,
  nodeSuccessors,
  nodeDisplayNames,
} = {}) => ({
  nodeAttributes: nodeAttributes || [],
  nodeAttributesHistory: nodeAttributesHistory || null,
  nodeAttributesFuture: nodeAttributesFuture || null,
  nodePredecessors: nodePredecessors || {
    sv: [],
    fi: [],
    en: [],
  },
  nodeSuccessors: nodeSuccessors || {
    fi: [],
    sv: [],
    en: [],
  },
  nodeDisplayNames: nodeDisplayNames || {
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
  },
  nodeFavorableNames: {
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
  },
  node: {
    id: '4820',
    name: 'TIKE, Tietotekniikkaratkaisut (TIRA)',
    startDate: null,
    endDate: null,
    timestamp: '2022-01-18T15:39:54.603+00:00',
    uniqueId: 38919588,
    ...node,
  },
});
