import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hierarchyFilters: [],
  validhierarchyFilters: [],
};

const hierarchyFiltersSlice = createSlice({
  name: 'hierarchyFilters',
  initialState,
});

export const hierarchyFiltersReducer = hierarchyFiltersSlice.reducer;
