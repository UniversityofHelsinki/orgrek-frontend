import React from 'react';
import { render } from '@testing-library/react';
import * as stories from '../../src/stories/components/attributes/AttributeEditor.stories';
import { composeStories } from '@storybook/testing-react';

const testCases = Object.values(composeStories(stories)).map((Story) => [
  Story.storyName,
  Story,
]);

test.each(testCases)('Renders %s story', async (storyName, Story) => {
  const { container, baseElement } = await render(<Story />);

  if (Story.play) {
    await Story.play({ canvasElement: container });
  }

  expect(baseElement).toMatchSnapshot();
});
