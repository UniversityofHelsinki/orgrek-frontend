import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queue: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      console.log(action.payload);
      state.queue.push({
        ...action.payload,
        key: new Date().getTime(),
      });
    },
    dismissNotification: (state, action) => {
      const index = state.queue.findIndex(
        (notification) => notification.key === action.payload.key
      );
      state.queue.splice(index, 1);
    },
  },
});

export const { showNotification, dismissNotification } =
  notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
