import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { dayReducer } from './dayChange';
import { editModeReducer } from './editMode';
import { hierarchyFilterReducer } from './hierarchyFilter';
import { hierarchyReducer } from './hierarchy';
import { nodeDetailsViewReducer } from './nodeDetailsView';
import { nodeReducer } from './node';
import { treeReducer } from './tree';
import { textsReducer } from './texts';
import { userReducer } from './user';
import { api } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { notificationsReducer } from './notifications';
import { errorHandler } from './errorHandler';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    tree: treeReducer,
    hr: hierarchyReducer,
    nrd: nodeReducer,
    ur: userReducer,
    dr: dayReducer,
    nvrd: nodeDetailsViewReducer,
    texts: textsReducer,
    hierarchyFilters: hierarchyFilterReducer,
    editModeReducer: editModeReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      api.middleware,
      errorHandler,
      thunk,
    ]),
});

setupListeners(store.dispatch);
export default store;
