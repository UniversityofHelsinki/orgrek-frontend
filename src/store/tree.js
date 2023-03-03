import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/treeReducer';

const initialState = {
  tree: {},
  selectedHierarchy: undefined,
  defaultHierarchy: 'talous',
  selectableHierarchies: [],
  treeWithAllHierarchies: {},
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  extraReducers(builder) {
    builder.addDefaultCase(legacyReducer);
  },
});

export const treeReducer = treeSlice.reducer;
