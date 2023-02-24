import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/treeReducer';

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
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  extraReducers(builder) {
    builder.addDefaultCase(legacyReducer);
  },
});

export const treeReducer = treeSlice.reducer;
