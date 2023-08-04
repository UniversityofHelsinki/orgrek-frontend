import { expect } from '@storybook/jest';
import {
  mockGetAttributeKeys,
  mockGetAttributes,
  mockGetCodeAttributes,
  mockSaveCodeAttributes,
  withMockStore,
} from '../../../mockStore';
import CodeAttributesSection from '../../../components/nodeDetails/CodeAttributesSection';
import { waitFor, within } from '@storybook/testing-library';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const nodeId = '12345678';
const selectedHierarchy = 'virallinen';

export default {
  component: CodeAttributesSection,
  parameters: {
    systemTime: now,
    reactRouter: {
      searchParams: {
        uid: nodeId,
        hierarchies: selectedHierarchy,
      },
    },
  },
};

export const Default = {
  parameters: {
    systemTime: now,
    msw: {
      handlers: [
        mockGetAttributes(nodeId, {
          codes: [
            {
              id: 1001,
              nodeId: '1',
              key: 'lyhenne',
              value: 'LYH',
              startDate: '1970-01-01',
              endDate: null,
            },
            {
              id: 1002,
              nodeId: '1',
              key: 'emo_lyhenne',
              value: 'EMO',
              startDate: null,
              endDate: null,
            },
            {
              id: 1003,
              nodeId: '1',
              key: 'iam_ryhma',
              value: 'group1',
              startDate: null,
              endDate: null,
            },
            {
              id: 1004,
              nodeId: '1',
              key: 'talous_tunnus',
              value: '101',
              startDate: null,
              endDate: null,
            },
            {
              id: 1005,
              nodeId: '1',
              key: 'hr_lyhenne',
              value: 'HRLYH',
              startDate: null,
              endDate: null,
            },
            {
              id: 1006,
              nodeId: '1',
              key: 'hr_tunnus',
              value: 'HR102',
              startDate: null,
              endDate: null,
            },
            {
              id: 1007,
              nodeId: '1',
              key: 'tutkimus_tunnus',
              value: 'TUT102',
              startDate: null,
              endDate: null,
            },
            {
              id: 1008,
              nodeId: '1',
              key: 'oppiaine_tunnus',
              value: 'OPP102',
              startDate: null,
              endDate: null,
            },
            {
              id: 1009,
              nodeId: '1',
              key: 'laskutus_tunnus',
              value: 'LAS102',
              startDate: null,
              endDate: null,
            },
            {
              id: 1010,
              nodeId: '1',
              key: 'mainari_tunnus',
              value: 'MAI102',
              startDate: null,
              endDate: null,
            },
          ],
        }),
        mockSaveCodeAttributes(nodeId),
      ],
    },
  },
  decorators: [
    withMockStore({
      nrd: {
        node: {
          uniqueId: nodeId,
        },
      },
      tree: { selectedHierarchy },
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Yksilöivä tunniste')).toBeInTheDocument();
    });

    expect(canvas.getByText('Lyhenne')).toBeInTheDocument();
    expect(canvas.getByText('Yläyksikön lyhenne')).toBeInTheDocument();
    expect(canvas.getByText('Taloustunnus')).toBeInTheDocument();
  },
};

export const Empty = {
  parameters: {
    systemTime: now,
    msw: {
      handlers: [
        mockGetAttributes(nodeId, { codes: [] }),
        mockSaveCodeAttributes(nodeId),
      ],
    },
  },
  decorators: [
    withMockStore({
      tree: { selectedHierarchy },
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Yksilöivä tunniste')).toBeInTheDocument();
    });
  },
};
