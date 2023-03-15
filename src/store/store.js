import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { loadTranslations, syncTranslationWithStore } from 'react-redux-i18n';
import translationsObject from '../translations';
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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(api.middleware)
      .concat(thunk),
});

setupListeners(store.dispatch);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationsObject));

export default store;
