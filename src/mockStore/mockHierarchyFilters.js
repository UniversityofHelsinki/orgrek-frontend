/* eslint-disable max-lines */

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

export const hierarchyFilters = [
  {
    id: 6,
    hierarchy: 'talous',
    key: 'type',
    value: 'koontiyksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 7,
    hierarchy: 'opetus',
    key: 'type',
    value: 'koontiyksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 12,
    hierarchy: 'opetus',
    key: 'type',
    value: 'tiedekunta',
    startDate: null,
    endDate: null,
  },
  {
    id: 17,
    hierarchy: 'opetus',
    key: 'type',
    value: 'erillinen laitos',
    startDate: null,
    endDate: null,
  },
  {
    id: 21,
    hierarchy: 'talous',
    key: 'type',
    value: 'osasto',
    startDate: '2017-12-31T22:00:00.000+00:00',
    endDate: null,
  },
  {
    id: 22,
    hierarchy: 'opetus',
    key: 'type',
    value: 'osasto',
    startDate: '2017-12-31T22:00:00.000+00:00',
    endDate: null,
  },
  {
    id: 31,
    hierarchy: 'talous',
    key: 'type',
    value: 'tulosyksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 36,
    hierarchy: 'opetus',
    key: 'type',
    value: 'tutkijakoulu',
    startDate: null,
    endDate: null,
  },
  {
    id: 38,
    hierarchy: 'opetus',
    key: 'type',
    value: 'kandiohjelma',
    startDate: null,
    endDate: null,
  },
  {
    id: 40,
    hierarchy: 'opetus',
    key: 'type',
    value: 'maisteriohjelma',
    startDate: null,
    endDate: null,
  },
  {
    id: 43,
    hierarchy: 'opetus',
    key: 'type',
    value: 'tohtoriohjelma',
    startDate: null,
    endDate: null,
  },
  {
    id: 45,
    hierarchy: 'talous',
    key: 'talous_tunnus',
    value: null,
    startDate: null,
    endDate: null,
  },
  {
    id: 46,
    hierarchy: 'opetus',
    key: 'oppiaine_tunnus',
    value: null,
    startDate: null,
    endDate: null,
  },
  {
    id: 123,
    hierarchy: 'opetus',
    key: 'type',
    value: 'oppiaine',
    startDate: null,
    endDate: null,
  },
  {
    id: 32688,
    hierarchy: 'talous',
    key: 'type',
    value: 'talousvastuullinen yksikko',
    startDate: '2023-03-12T22:00:00.000+00:00',
    endDate: null,
  },
  {
    id: 32272,
    hierarchy: 'opetus',
    key: 'type',
    value: 'erilliset opinnot',
    startDate: '2022-12-31T22:00:00.000+00:00',
    endDate: null,
  },
  {
    id: 32716,
    hierarchy: 'talous',
    key: 'type',
    value: 'yritys_yhteiso',
    startDate: null,
    endDate: null,
  },
  {
    id: 32686,
    hierarchy: 'talous',
    key: 'publicity',
    value: null,
    startDate: null,
    endDate: null,
  },
];
