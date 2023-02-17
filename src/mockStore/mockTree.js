import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tree: {},
  selectedHierarchy: 'talous',
  defaultHierarchy: 'talous',
  selectableHierarchies: [],
  treeWithAllHierarchies: {},
  selectedHierarchies: [],
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
});

export const treeReducer = treeSlice.reducer;
