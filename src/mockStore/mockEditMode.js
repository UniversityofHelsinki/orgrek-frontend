import { createSlice } from '@reduxjs/toolkit';
import legacyReducer from '../reducers/editModeReducer';

const initialState = {
  edit: false,
};

/**
 * @deprecated used only in the legacy edit view
 */
const editModeSlice = createSlice({
  name: 'editMode',
  initialState,
  extraReducers(builder) {
    builder.addDefaultCase(legacyReducer);
  },
});

/**
 * @deprecated used only in the legacy edit view
 */
export const editModeReducer = editModeSlice.reducer;
