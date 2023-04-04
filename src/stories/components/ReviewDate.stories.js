import ReviewDateComponent from '../../components/ReviewDate';
import { withMockStore } from '../../mockStore';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

export default {
  component: ReviewDateComponent,
};

export const ReviewDate = {
  parameters: { systemTime: now },
  decorators: [withMockStore({ dr: { selectedDay: now } })],
};
