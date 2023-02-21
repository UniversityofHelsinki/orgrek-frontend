import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tree: {},
  selectedHierarchy: 'talous',
  defaultHierarchy: 'talous',
  selectableHierarchies: [
    'tutkimus',
    'henkilosto',
    'toiminnanohjaus',
    'opetus',
    'history',
    'talous',
  ],
  treeWithAllHierarchies: {},
  selectedHierarchies: [],
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
});

export const treeReducer = treeSlice.reducer;
