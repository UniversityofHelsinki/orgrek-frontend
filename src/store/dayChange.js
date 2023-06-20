import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/dayChangeReducer';

const midnight = (date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const initialState = {
  selectedDay: midnight(new Date()),
};

const daySlice = createSlice({
  name: 'day',
  initialState,
  extraReducers(builder) {
    builder.addDefaultCase(legacyReducer);
  },
});

export const dayReducer = daySlice.reducer;
