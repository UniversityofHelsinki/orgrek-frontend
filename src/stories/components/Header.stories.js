import React from 'react';
import HeaderComponent from '../../components/Header';
import { withMockStore } from '../../mockStore';

export default {
  component: HeaderComponent,
};

export const Header = {
  decorators: [withMockStore()],
};
