import ReviewDateComponent from '../../components/ReviewDate';
import { withMockStore } from '../../mockStore';

export default {
  component: ReviewDateComponent,
};

export const ReviewDate = {
  decorators: [withMockStore()],
};
