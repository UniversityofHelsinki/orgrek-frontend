import React from 'react';
import EditableAccordion from '../../components/EditableAccordion';

export default {
  component: EditableAccordion,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: true, control: 'none' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Accordion with a modified indicator. Prevents collapsing when modified.',
      },
    },
  },
};

export const Default = {
  args: {
    title: 'Title',
    defaultModified: false,
    disabled: false,
  },
  render: (args) => (
    <EditableAccordion {...args}>Editable content</EditableAccordion>
  ),
};

export const Modified = {
  ...Default,
  args: {
    ...Default.args,
    defaultModified: true,
  },
};
