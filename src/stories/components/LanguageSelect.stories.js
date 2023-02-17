import LanguageSelect from '../../components/LanguageSelect';
import { createAdmin, createReader, withUser } from '../../mockStore';
import React from 'react';

export default {
  component: LanguageSelect,
};

export const Admin = {
  decorators: [withUser(createAdmin())],
};

export const Reader = {
  decorators: [withUser(createReader())],
};
