import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/dayChangeReducer';

const initialState = {
  selectedDay: new Date(),
};

const daySlice = createSlice({
  name: 'day',
  initialState,
  extraReducers(builder) {
    builder.addDefaultCase(legacyReducer);
  },
});

export const dayReducer = daySlice.reducer;
