import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/nodeReducer';

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

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  extraReducers(builder) {
    builder.addDefaultCase(legacyReducer);
  },
});

export const nodeReducer = nodeSlice.reducer;
