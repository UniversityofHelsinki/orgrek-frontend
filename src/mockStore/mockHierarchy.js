const defaultHierarchies = [
  'tutkimus',
  'henkilosto',
  'toiminnanohjaus',
  'opetus',
  'history',
  'talous',
  'virallinen',
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
