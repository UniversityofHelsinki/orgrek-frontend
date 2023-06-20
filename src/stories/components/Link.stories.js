import React from 'react';
import Link from '../../components/Link';

export default {
  component: Link,
  tags: ['autodocs'],
};

export const NodeLink = {
  args: {
    to: '',
    node: 12345678,
    hierarchies: '',
    text: 'Helsingin yliopisto (HY)',
  },
  render: ({ text, ...args }) => <Link {...args}>{text}</Link>,
};

export const HierarchiesLink = {
  ...NodeLink,
  args: {
    to: '',
    node: '',
    hierarchies: 'talous,opetus',
    text: 'Hierarchy link',
  },
};

export const PathLink = {
  ...NodeLink,
  args: {
    to: '/texts',
    node: '',
    hierarchies: '',
    text: 'Texts',
  },
};
