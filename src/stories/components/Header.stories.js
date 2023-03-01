import React from 'react';
import HeaderComponent from '../../components/Header';
import { createAdmin, createReader, withUser } from '../../mockStore';

export default {
  component: HeaderComponent,
  parameters: {
    layout: 'fullscreen',
  },
};

export const AdminRole = {
  decorators: [withUser(createAdmin())],
};

export const ReaderRole = {
  decorators: [withUser(createReader())],
};
