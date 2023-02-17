import LanguageSelect from '../../components/LanguageSelect';
import { createAdmin, createReader, withMockStore } from '../../mockStore';
import React from 'react';

export default {
  component: LanguageSelect,
};

export const Admin = {
  decorators: [withMockStore({ ur: { user: createAdmin() } })],
};

export const Reader = {
  decorators: [withMockStore({ ur: { user: createReader() } })],
};
