import { configureStore } from '@reduxjs/toolkit';
import { treeReducer } from './mockTree';
import { hierarchyReducer } from './mockHierarchy';
import { nodeReducer } from './mockNode';
import { userReducer } from './mockUser';
import { dayReducer } from './mockDay';
import { nodeDetailsViewReducer } from './mockNodeDetailsView';
import { hierarchyFiltersReducer } from './mockHierarchyFilters';
import { editModeReducer } from './mockEditMode';
import { Provider } from 'react-redux';
import React from 'react';

export const configureMockStore = (preloadedState = {}) =>
  configureStore({
    preloadedState,
    reducer: {
      tree: treeReducer,
      hr: hierarchyReducer,
      nrd: nodeReducer,
      ur: userReducer,
      dr: dayReducer,
      nvrd: nodeDetailsViewReducer,
      hierarchyFilters: hierarchyFiltersReducer,
      editModeReducer: editModeReducer,
    },
  });

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
 * For convience decorator that mocks Redux store with the given user.
 *
 * Use this decorator when you need to mock only the current user.
 * As alternative, withMockStore decorator can mock the whole state.
 *
 * @param user current user
 */
export const withUser = (user) => withMockStore({ ur: user });
