import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/treeReducer';
import { defaultHierarchy } from '../Constants';

const initialState = {
  selectedHierarchy: undefined,
  defaultHierarchy,
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
