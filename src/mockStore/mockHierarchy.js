import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parents: { fi: [], sv: [], en: [], ia: [] },
  children: { fi: [], sv: [], en: [], ia: [] },
  parentsFuture: { fi: [], sv: [], en: [], ia: [] },
  parentsHistory: { fi: [], sv: [], en: [], ia: [] },
  childrenFuture: { fi: [], sv: [], en: [], ia: [] },
  childrenHistory: { fi: [], sv: [], en: [], ia: [] },
};

const hierarchySlice = createSlice({
  name: 'hierarchy',
  initialState,
});

export const hierarchyReducer = hierarchySlice.reducer;
