import { configureStore } from '@reduxjs/toolkit';
import { createNodeState } from './mockNode';
import {
  api,
  notificationsReducer,
  treeReducer,
  userReducer,
  dayReducer,
  nodeReducer,
  hierarchyReducer,
  editModeReducer,
  nodeDetailsViewReducer,
  hierarchyFilterReducer,
} from '../store';
import { Provider } from 'react-redux';
import React from 'react';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createAdmin } from './mockUser';

export const configureMockStore = (preloadedState = {}) => {
  const store = configureStore({
    preloadedState: {
      ur: {
        user: createAdmin(),
      },
      ...preloadedState,
    },
    reducer: {
      [api.reducerPath]: api.reducer,
      tree: treeReducer,
      hr: hierarchyReducer,
      nrd: nodeReducer,
      ur: userReducer,
      dr: dayReducer,
      nvrd: nodeDetailsViewReducer,
      hierarchyFilters: hierarchyFilterReducer,
      editModeReducer: editModeReducer,
      notifications: notificationsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

/**
 * Configures Redux store from initial state and any additional test data
 * passed to this component.
 *
 * Intended to be used as Storybook story decorator, but it should work in
 * tests as well.
 *
 * @param state
 * @param children a Storybook story or any component using the Redux store
 */
export const MockStoreProvider = ({ state, children }) => {
  const store = configureMockStore(state);

  return <Provider store={store}>{children}</Provider>;
};

/**
 * Storybook decorator function which provides the mock Redux store to the story
 *
 * @param state
 * @return a function that can be passed to Storybook decorator array
 */
export const withMockStore = (state) => {
  return function MockStoreDecorator(Story) {
    return (
      <MockStoreProvider state={state}>
        <Story />
      </MockStoreProvider>
    );
  };
};

/**
 * For convenience a decorator that mocks Redux store with the given user.
 *
 * Use this decorator when you need to mock only the current user.
 * Alternatively, withMockStore decorator can mock the whole state.
 *
 * @param user current user
 */
export const withUser = (user) => withMockStore({ ur: { user } });

/**
 * For convenience a decorator that mocks Redux store with the given node data.
 *
 * Use this decorator when you need to mock only the node reducer state.
 * Alternatively, withMockStore decorator can mock the whole state.
 *
 * @param nodeState overrides node reducer initial state
 * @deprecated not needed after everything has been migrated to RTK Query
 */
export const withNode = (nodeState) =>
  withMockStore({ nrd: createNodeState(nodeState) });

/**
 * For convenience a decorator that mocks Redux store with the given hierarchy
 * data.
 *
 * Use this decorator when you need to mock only the hierarchy reducer state.
 * Alternatively, withMockStore decorator can mock the whole state.
 *
 * @param hierarchyState overrides hierarchy reducer initial state
 * @deprecated not needed after everything has been migrated to RTK Query
 */
export const withHierarchy = (hierarchyState) =>
  withMockStore({ hr: { ...hierarchyState } });
