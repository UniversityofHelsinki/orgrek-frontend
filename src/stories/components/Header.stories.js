import React from 'react';
import HeaderComponent from '../../components/Header';
import { createAdmin, withUser } from '../../mockStore';

export default {
  component: HeaderComponent,
};

export const Header = {
  decorators: [withUser(createAdmin())],
};
