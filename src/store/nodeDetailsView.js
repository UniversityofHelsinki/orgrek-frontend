import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/nodeDetailsViewReducer';

const initialState = {
  showHistory: false,
  showComing: false,
};

const nodeDetailsViewSlice = createSlice({
  name: 'nodeDetailsView',
  initialState,
  extraReducers(builder) {
    builder.addDefaultCase(legacyReducer);
  },
});

export const nodeDetailsViewReducer = nodeDetailsViewSlice.reducer;
