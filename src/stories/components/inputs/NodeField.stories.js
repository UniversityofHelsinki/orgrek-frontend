import { expect, fn } from '@storybook/test';
import NodeField from '../../../components/inputs/NodeField';
import { mockGetTree, withMockStore, tree } from '../../../mockStore';
import { userEvent, within, waitFor } from '@storybook/test';
import React, { useState } from 'react';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const selectedHierarchy = 'virallinen';

export default {
  component: NodeField,
  parameters: {
    systemTime: now,
  },
  args: {
    onClick: fn(),
    onChange: fn(),
  },
};

export const Combobox = {
  args: {
    variant: 'combobox',
    label: 'Etsi nimellä tai tunnuksella',
    value: null,
    helperText: '',
    placeholder: '',
    required: false,
    disabled: false,
    error: false,
    onClick: fn(),
    onChange: fn(),
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    const handleChange = (event, newValue, reason) => {
      if (newValue) {
        setValue({ ...newValue, names: { fi: newValue.name } });
      } else {
        setValue(null);
      }
      if (args.onChange) {
        args.onChange(event, newValue, reason);
      }
    };

    return <NodeField {...args} value={value} onChange={handleChange} />;
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
    label: 'Etsi nimellä tai tunnuksella',
    variant: 'search',
    onClick: fn(),
  },
};

export const Selected = {
  ...Combobox,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    await userEvent.type(
      canvas.getByLabelText('Etsi nimellä tai tunnuksella'),
      'kie'
    );

    await waitFor(async () => {
      await expect(canvas.getByText(/HY, Kielikeskus/)).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByText(/HY, Kielikeskus/));

    await expect(
      canvas.getByLabelText('Etsi nimellä tai tunnuksella')
    ).toHaveValue('HY, Kielikeskus (KIELIKESKUS)');
  },
};

export const ExistingValue = {
  ...Combobox,
  args: {
    ...Combobox.args,
    value: {
      id: 38919588,
      names: { fi: 'TIKE, Tietotekniikkaratkaisut (TIRA)' },
    },
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    await waitFor(async () => {
      await expect(
        canvas.getByLabelText('Etsi nimellä tai tunnuksella')
      ).toHaveValue('TIKE, Tietotekniikkaratkaisut (TIRA)');
    });
  },
};

export const Cleared = {
  ...ExistingValue,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    await userEvent.click(canvas.getByTitle('Tyhjennä'));

    await waitFor(async () => {
      await expect(
        canvas.getByLabelText('Etsi nimellä tai tunnuksella')
      ).toHaveValue('');
    });
  },
};
