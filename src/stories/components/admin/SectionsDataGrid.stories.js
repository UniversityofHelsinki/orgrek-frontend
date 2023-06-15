import React from 'react';
import SectionsDataGrid from '../../../components/admin/SectionsDataGrid';
import Container from '@mui/material/Container';
import { createAdmin, createWriter, withUser } from '../../../mockStore';

const data = [
  {
    id: 1,
    section: 'codes',
    attr: 'emo_lyhenne',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 2,
    section: 'codes',
    attr: 'hr_lyhenne',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 3,
    section: 'codes',
    attr: 'hr_tunnus',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 4,
    section: 'other_attributes',
    attr: 'iam-henkilostoryhma',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 5,
    section: 'codes',
    attr: 'iam_ryhma',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 6,
    section: 'codes',
    attr: 'laskutus_tunnus',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 7,
    section: 'codes',
    attr: 'lyhenne',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 8,
    section: 'codes',
    attr: 'mainari_tunnus',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 9,
    section: 'codes',
    attr: 'oppiaine_tunnus',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 10,
    section: 'codes',
    attr: 'talous_tunnus',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 11,
    section: 'codes',
    attr: 'tutkimus_tunnus',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 12,
    section: 'other_attributes',
    attr: 'iam-johtoryhma',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 13,
    section: 'other_attributes',
    attr: 'publicity',
    startDate: '2023-04-03',
    endDate: null,
  },
  {
    id: 14,
    section: 'names',
    attr: 'name_fi',
    startDate: '2023-04-04',
    endDate: null,
  },
  {
    id: 15,
    section: 'names',
    attr: 'name_sv',
    startDate: '2023-04-04',
    endDate: null,
  },
  {
    id: 16,
    section: 'names',
    attr: 'name_en',
    startDate: '2023-04-04',
    endDate: null,
  },
  {
    id: 17,
    section: 'types',
    attr: 'type',
    startDate: '2023-04-04',
    endDate: null,
  },
];

const attributeKeys = data.map((row) => row.attr);

export default {
  component: SectionsDataGrid,
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
    onDeleteRow: { action: true },
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
    initialRows: data,
    attributeKeys,
    loading: false,
  },
  decorators: [withUser(createAdmin())],
};

export const Empty = {
  ...Default,
  args: {
    ...Default.args,
    initialRows: [],
  },
};

export const ReadOnly = {
  ...Default,
  decorators: [withUser(createWriter())],
};
