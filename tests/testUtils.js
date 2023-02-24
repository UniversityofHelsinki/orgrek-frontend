import React, { Suspense } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Import your own reducer
import rootReducer from '../src/reducers/index';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Renders a Storybook story.
 *
 * This allows reusing stories in tests without duplicating the same data
 * for both stories and tests.
 *
 * @param story Storybook story object in CSF 3 format
 * @param meta Story metadata (i.e. the default export from the story file),
 * required if the given story does not have a render function
 */
export const renderStory = (story, meta) => {
  const args = story.args ?? {};

  if (story.render) {
    return render(story.render(args));
  } else {
    return render(meta.component(args));
  }
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
