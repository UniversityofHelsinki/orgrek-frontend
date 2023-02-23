import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feedback: undefined,
  feedback_stored: undefined,
  nodeAttributes: null,
  nodeAttributesHistory: null,
  nodeAttributesFuture: null,
  nodePredecessors: { fi: [], sv: [], en: [], ia: [] },
  nodeSuccessors: { fi: [], sv: [], en: [], ia: [] },
  nodeDisplayNames: { fi: [], sv: [], en: [], ia: [] },
  nodeFavorableNames: {
    fi: undefined,
    en: undefined,
    sv: undefined,
    ia: undefined,
  },
};

export const createNodeState = ({
  node,
  nodeAttributes,
  nodeAttributesHistory,
  nodeAttributesFuture,
  nodeDisplayNames,
} = {}) => ({
  nodeAttributes: nodeAttributes || [
    {
      id: 4824,
      nodeId: '4820',
      key: 'talous_tunnus',
      value: 'H9073',
      startDate: null,
      endDate: null,
    },
    {
      id: 4825,
      nodeId: '4820',
      key: 'type',
      value: 'tulosyksikko',
      startDate: null,
      endDate: null,
    },
    {
      id: 4821,
      nodeId: '4820',
      key: 'name_en',
      value: 'IT Solutions',
      startDate: null,
      endDate: null,
    },
    {
      id: 4822,
      nodeId: '4820',
      key: 'name_sv',
      value: 'Datatekniklösningar',
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
      id: 4826,
      nodeId: '4820',
      key: 'name_fi',
      value: 'Tietotekniikkaratkaisut',
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
    {
      id: 27788,
      nodeId: '4820',
      key: 'publicity',
      value: 'julkinen',
      startDate: null,
      endDate: null,
    },
  ],
  nodeAttributesHistory: nodeAttributesHistory || null,
  nodeAttributesFuture: nodeAttributesFuture || null,
  nodePredecessors: {
    sv: [],
    fi: [],
    en: [],
  },
  nodeSuccessors: {
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

const nodeSlice = createSlice({
  name: 'node',
  initialState,
});

export const nodeReducer = nodeSlice.reducer;
