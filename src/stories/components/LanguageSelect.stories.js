import LanguageSelect from '../../components/LanguageSelect';
import { createAdmin, createReader, withUser } from '../../mockStore';
import React from 'react';

export default {
  component: LanguageSelect,
};

export const AdminRole = {
  decorators: [withUser(createAdmin())],
};

export const ReaderRole = {
  decorators: [withUser(createReader())],
};
