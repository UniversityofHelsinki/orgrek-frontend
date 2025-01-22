import TextsDataGrid from '../../../components/admin/TextsDataGrid';
import { mergeTexts, textsToRows } from '../../../pages/TextsPage.js';
import Container from '@mui/material/Container';
import React from 'react';
import defaultFi from '../../../locales/default.fi.json';
import defaultSv from '../../../locales/default.sv.json';
import defaultEn from '../../../locales/default.en.json';
import { createAdmin, createWriter, withUser } from '../../../mockStore';
import { fn } from '@storybook/test';

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
  args: {
    onAddRow: fn(),
    onRowChange: fn(),
    onDeleteRows: fn(),
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
