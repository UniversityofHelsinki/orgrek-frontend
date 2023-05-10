import { withNode } from '../../../mockStore';
import DisplayNameSection from '../../../components/nodeDetails/DisplayNameSection';
import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: DisplayNameSection,
};

export const Default = {
  decorators: [withNode()],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(
        canvas.getByText('TIKE, Tietotekniikkaratkaisut (TIRA)')
      ).toBeInTheDocument();
    });
    await expect(
      canvas.getByText('TIKE, Datatekniklösningar (TIRA)')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('TIKE, IT Solutions (TIRA)')
    ).toBeInTheDocument();
  },
};

export const Empty = {
  decorators: [withNode({ nodeDisplayNames: {} })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByText('Koko nimi puuttuu')).toBeInTheDocument();
    });
  },
};

export const ShowHistory = {
  decorators: [
    withNode({
      nodeDisplayNames: {
        fi: [
          {
            nodeId: 'a1',
            language: 'fi',
            name: 'Helsingin yliopisto (HY)',
            startDate: '1919-02-17',
            endDate: null,
          },
          {
            nodeId: 'a1',
            language: 'fi',
            name: 'Keisarillinen Aleksanterin Yliopisto (HY)',
            startDate: '1828-01-01',
            endDate: '1919-02-16',
          },
          {
            nodeId: 'a1',
            language: 'fi',
            name: 'Kuninkaallinen Turun Akatemia (HY)',
            startDate: '1640-03-25',
            endDate: '1827-12-31',
          },
        ],
        sv: [
          {
            nodeId: 'a1',
            language: 'sv',
            name: 'Helsingfors universitet (HY)',
            startDate: null,
            endDate: null,
          },
        ],
        en: [
          {
            nodeId: 'a1',
            language: 'en',
            name: 'University of Helsinki (HY)',
            startDate: null,
            endDate: null,
          },
        ],
      },
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(
        canvas.getByText('Kuninkaallinen Turun Akatemia (HY)')
      ).toBeInTheDocument();
    });
  },
};
