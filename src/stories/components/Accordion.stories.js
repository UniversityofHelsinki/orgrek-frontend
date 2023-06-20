import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '../../components/Accordion';

export default {
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: 'MUI Accordion customized with HY Design System styles',
      },
    },
  },
  argTypes: {
    onChange: { action: true, control: 'none' },
  },
};

export const Collapsed = {
  args: {
    disabled: false,
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionSummary>Accordion title</AccordionSummary>
        <AccordionDetails>Accordion details</AccordionDetails>
      </Accordion>
    );
  },
};

export const Expanded = {
  ...Collapsed,
  args: {
    ...Collapsed.args,
    defaultExpanded: true,
  },
};

export const Multiple = {
  render: () => (
    <div>
      <Accordion>
        <AccordionSummary>Accordion title 1</AccordionSummary>
        <AccordionDetails>Accordion details</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Accordion title 2</AccordionSummary>
        <AccordionDetails>Accordion details</AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>Accordion title 3</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus
          vulputate diam eu pretium. Mauris elit orci, ultricies id fermentum
          vel, porta et eros. Vestibulum condimentum lectus in convallis
          feugiat. Sed vulputate fringilla felis. Aliquam ut arcu et dui feugiat
          scelerisque eu quis diam. Mauris placerat congue dui sit amet blandit.
          Phasellus condimentum libero vel velit auctor, sit amet tincidunt
          velit varius.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          An example of an extremely long accordion title that contains
          uncomfortably many complicated words
        </AccordionSummary>
        <AccordionDetails>Accordion details</AccordionDetails>
      </Accordion>
    </div>
  ),
};
