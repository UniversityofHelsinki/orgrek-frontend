import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/userReducer';

const initialState = {
  user: { eppn: '', preferredLanguage: '', displayName: '', roles: [] },
  redirect401: null,
};

const treeSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers(builder) {
    builder.addDefaultCase(legacyReducer);
  },
});

export const userReducer = treeSlice.reducer;
