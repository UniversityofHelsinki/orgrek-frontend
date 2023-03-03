import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/hierarchyFilterReducer';

const initialState = {
  hierarchyFilters: [],
  validhierarchyFilters: [],
};

const editModeSlice = createSlice({
  name: 'hierarchyFilters',
  initialState,
  extraReducers(builder) {
    builder.addDefaultCase(legacyReducer);
  },
});

export const hierarchyFilterReducer = editModeSlice.reducer;
