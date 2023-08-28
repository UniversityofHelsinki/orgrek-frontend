import TextsDataGrid from '../../../components/admin/TextsDataGrid';
import { mergeTexts, textsToRows } from '../../../pages/TextsPage.js';
import Container from '@mui/material/Container';
import React from 'react';
import defaultFi from '../../../locales/default.fi.json';
import defaultSv from '../../../locales/default.sv.json';
import defaultEn from '../../../locales/default.en.json';
import { createAdmin, createWriter, withUser } from '../../../mockStore';

const defaults = {
  fi: textsToRows(defaultFi, 'fi'),
  en: textsToRows(defaultEn, 'en'),
  sv: textsToRows(defaultSv, 'sv'),
};

const defaultTexts = [
  ...textsToRows(defaultFi, 'fi'),
  ...textsToRows(defaultSv, 'sv'),
  ...textsToRows(defaultEn, 'en'),
];

const textsInDb = [
  {
    key: 'accordion.modifiedSaveBeforeClosing',
    language: 'en',
    value: 'Modified, save before closing',
    user_name: 'baabenom',
    timestamp: '2023-03-31 12:51:04',
  },
];

const data = mergeTexts(defaultTexts, textsInDb);

export default {
  component: TextsDataGrid,
  parameters: {
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          // Looks like a bug or false positive in mui-x/data-grid
          {
            id: 'aria-required-children',
            selector: '.MuiDataGrid-root',
            reviewOnFail: true, // Mark as "needs review" instead of failing the test
          },
        ],
      },
    },
  },
  argTypes: {
    onAddRow: { action: true },
    onRowChange: { action: true },
    onDeleteRows: { action: true },
  },
  decorators: [
    // Use same width for the container as in Sketch so that screenshots fit nicely
    (Story) => (
      <Container sx={{ pt: 6, pb: 6, maxWidth: 1440 }}>
        <Story />
      </Container>
    ),
  ],
};

export const Default = {
  args: {
    loading: false,
    initialRows: [
      {
        key: 'examples.buttonText',
        language: 'fi',
        value: null,
        defaultValue: 'Painike',
        user_name: null,
        timestamp: null,
      },
      {
        key: 'examples.buttonText',
        language: 'sv',
        value: null,
        defaultValue: 'examples.buttonText',
        user_name: null,
        timestamp: null,
      },
      {
        key: 'examples.buttonText',
        language: 'en',
        value: null,
        defaultValue: 'Button text',
        user_name: null,
        timestamp: null,
      },
      {
        key: 'examples.someText',
        language: 'fi',
        value: 'Muokattu teksti',
        defaultValue: 'Oletusteksti',
        user_name: 'baabenom',
        timestamp: '2023-06-13T12:47:16Z',
      },
      {
        key: 'examples.someText',
        language: 'sv',
        value: null,
        defaultValue: 'examples.someText',
        user_name: null,
        timestamp: null,
      },
      {
        key: 'examples.someText',
        language: 'en',
        value: 'Modified text',
        defaultValue: 'Default text',
        user_name: 'baabenom',
        timestamp: '2023-06-13T12:47:16Z',
      },
      {
        key: 'examples.attribute',
        language: 'fi',
        value: 'Attribuutti',
        user_name: 'baabenom',
        timestamp: '2023-06-09T06:14:24Z',
      },
      {
        key: 'examples.attribute',
        language: 'sv',
        value: 'Attribut',
        user_name: 'baabenom',
        timestamp: '2023-06-09T08:07:01Z',
      },
      {
        key: 'examples.attribute',
        language: 'en',
        value: 'Attribute',
        user_name: 'baabenom',
        timestamp: '2023-06-09T06:15:15Z',
      },
    ],
    rows: data,
  },
  decorators: [withUser(createAdmin())],
};

export const Empty = {
  ...Default,
  args: {
    ...Default.args,
    initialRows: [],
    rows: [],
  },
};

export const AllTexts = {
  ...Default,
  args: {
    ...Default.args,
    initialRows: textsInDb,
    rows: data,
  },
};

export const ReadOnly = {
  ...Default,
  decorators: [withUser(createWriter())],
};
