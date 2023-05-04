import { expect } from '@storybook/jest';
import NodeField from '../../../components/inputs/NodeField';
import { mockGetTree, withMockStore, tree } from '../../../mockStore';
import { userEvent, within, waitFor } from '@storybook/testing-library';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const selectedHierarchy = 'talous';

export default {
  component: NodeField,
  parameters: {
    systemTime: now,
  },
};

export const Combobox = {
  args: {
    variant: 'combobox',
    label: 'Yksikkö',
    placeholder: '',
    disabled: false,
  },
  parameters: {
    msw: {
      handlers: [
        mockGetTree({ hierarchies: selectedHierarchy, selectedDay: now }, tree),
      ],
    },
  },
  decorators: [
    withMockStore({
      dr: {
        selectedDay: now,
      },
      tree: {
        selectedHierarchy,
      },
    }),
  ],
};

export const Search = {
  ...Combobox,
  args: {
    ...Combobox.args,
    label: 'Hae yksikköä',
    variant: 'search',
  },
};

export const Selected = {
  ...Combobox,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    await userEvent.type(canvas.getByLabelText('Yksikkö'), 'kie');

    await waitFor(async () => {
      await expect(canvas.getByText(/HY, Kielikeskus/)).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByText(/HY, Kielikeskus/));
  },
};
