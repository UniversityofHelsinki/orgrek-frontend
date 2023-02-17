import { renderStory, screen } from '../testUtils';
import Meta, * as ValidityStories from '../../src/stories/components/attributes/Validity.stories';

test('start and end dates defined', () => {
  renderStory(ValidityStories.Default, Meta);

  expect(screen.getByTestId('validity')).toHaveTextContent(
    '1.1.2022 - 31.12.2022'
  );
});

test('valid from', () => {
  renderStory(ValidityStories.From, Meta);

  expect(screen.getByTestId('validity')).toHaveTextContent(
    'from_date_react 1.1.2022'
  );
});

test('valid until', () => {
  renderStory(ValidityStories.Until, Meta);

  expect(screen.getByTestId('validity')).toHaveTextContent(
    'until_date_react 31.12.2022'
  );
});

test('undefined', () => {
  renderStory(ValidityStories.Undefined, Meta);

  expect(screen.getByTestId('validity')).toHaveTextContent('not_specified');
});
