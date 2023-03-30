import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parents: { fi: [], sv: [], en: [] },
  children: { fi: [], sv: [], en: [] },
  parentsFuture: { fi: [], sv: [], en: [] },
  parentsHistory: { fi: [], sv: [], en: [] },
  childrenFuture: { fi: [], sv: [], en: [] },
  childrenHistory: { fi: [], sv: [], en: [] },
};

const defaultHierarchies = [
  'tutkimus',
  'henkilosto',
  'toiminnanohjaus',
  'opetus',
  'history',
  'talous',
];

export const createHierarchies = (
  hierarchies = null,
  startDate = null,
  endDate = null
) =>
  (hierarchies || defaultHierarchies).map((hierarchy) => ({
    hierarchy,
    startDate,
    endDate,
  }));

/**
 * @deprecated not needed after everything has been migrated to RTK Query
 */
const hierarchySlice = createSlice({
  name: 'hierarchy',
  initialState,
});

/**
 * @deprecated not needed after everything has been migrated to RTK Query
 */
export const hierarchyReducer = hierarchySlice.reducer;
