import React, { useState } from 'react';
import AttributeEditor from '../../../components/attributes/AttributeEditor';
import AttributeEditorRow from '../../../components/attributes/AttributeEditorRow';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { within, userEvent } from '@storybook/testing-library';

export default {
  component: AttributeEditor,
  subcomponents: { AttributeEditorRow },
  argTypes: {
    onChange: { action: true },
  },
};

export const Default = {
  args: {
    attributeLabel: 'Attribuutti',
    data: [
      {
        id: 1001,
        value: 'value3',
        startDate: '2023-01-01',
        endDate: null,
        isNew: false,
        deleted: false,
      },
      {
        id: 1002,
        value: 'value2',
        startDate: '2022-01-01',
        endDate: '2022-12-31',
        isNew: false,
        deleted: false,
      },
      {
        id: 1003,
        value: 'value1',
        startDate: null,
        endDate: '2021-12-31',
        isNew: false,
        deleted: false,
      },
    ],
  },
  render: (args) => {
    const [data, setData] = useState(args.data);

    const handleChange = (newData) => {
      setData(newData);
      args.onChange && args.onChange(newData);
    };

    return <AttributeEditor {...args} data={data} onChange={handleChange} />;
  },
};

export const Empty = {
  ...Default,
  args: {
    ...Default.args,
    data: [],
  },
};

export const ActionMenuOpen = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getAllByTestId('attributeRowMenuButton')[0]);
  },
};

export const ValueRequired = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.clear(canvas.getAllByRole('textbox')[0]);
  },
};

export const InvalidDate = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.clear(canvas.getAllByRole('textbox')[1]);
    await userEvent.type(canvas.getAllByRole('textbox')[1], '1.1.');
  },
};

export const DeletedRow = {
  ...Default,
  args: {
    ...Default.args,
    data: [
      {
        id: 1001,
        value: 'value3',
        startDate: '2023-01-01',
        endDate: null,
        isNew: false,
        deleted: false,
      },
      {
        id: 1002,
        value: 'value2',
        startDate: '2022-01-01',
        endDate: '2022-12-31',
        isNew: false,
        deleted: true,
      },
      {
        id: 1003,
        value: 'value1',
        startDate: null,
        endDate: '2021-12-31',
        isNew: false,
        deleted: false,
      },
    ],
  },
};

export const DropdownEditor = {
  ...Default,
  parameters: {
    docs: {
      description: {
        story: 'An example how to use a dropdown field for editing values',
      },
    },
  },
  render: (args) => {
    const [data, setData] = useState(args.data);

    const handleChange = (newData) => {
      setData(newData);
      args.onChange && args.onChange(newData);
    };

    const renderValueField = (valueFieldProps) => (
      <TextField select {...valueFieldProps}>
        <MenuItem value="value1">Arvo 1</MenuItem>
        <MenuItem value="value2">Arvo 2</MenuItem>
        <MenuItem value="value3">Arvo 3</MenuItem>
      </TextField>
    );

    return (
      <AttributeEditor
        {...args}
        data={data}
        onChange={handleChange}
        renderValueField={renderValueField}
      />
    );
  },
};
