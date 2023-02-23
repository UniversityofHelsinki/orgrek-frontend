import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parents: { fi: [], sv: [], en: [] },
  children: { fi: [], sv: [], en: [] },
  parentsFuture: { fi: [], sv: [], en: [] },
  parentsHistory: { fi: [], sv: [], en: [] },
  childrenFuture: { fi: [], sv: [], en: [] },
  childrenHistory: { fi: [], sv: [], en: [] },
};

export const createHierarchies = (
  hierarchies = [
    'tutkimus',
    'henkilosto',
    'toiminnanohjaus',
    'opetus',
    'history',
    'talous',
  ],
  startDate = null,
  endDate = null
) =>
  hierarchies.map((hierarchy) => ({
    hierarchy,
    startDate,
    endDate,
  }));

const hierarchySlice = createSlice({
  name: 'hierarchy',
  initialState,
});

export const hierarchyReducer = hierarchySlice.reducer;
