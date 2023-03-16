import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/treeReducer';

const initialState = {
  selectedHierarchy: undefined,
  defaultHierarchy: 'talous',
  selectableHierarchies: [],
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  extraReducers(builder) {
    builder.addDefaultCase(legacyReducer);
  },
});

export const treeReducer = treeSlice.reducer;
