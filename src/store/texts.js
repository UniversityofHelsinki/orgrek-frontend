import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/textsReducer';

const initialState = {
  texts: [],
};

const treeSlice = createSlice({
  name: 'texts',
  initialState,
  extraReducers(builder) {
    builder.addDefaultCase(legacyReducer);
  },
});

export const textsReducer = treeSlice.reducer;
