import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/editModeReducer';

const initialState = {
  edit: false,
};

const editModeSlice = createSlice({
  name: 'editMode',
  initialState,
  extraReducers(builder) {
    builder.addDefaultCase(legacyReducer);
  },
});

export const editModeReducer = editModeSlice.reducer;
