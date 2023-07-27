import React from 'react';
import Tree from '../../components/tree/Tree';

export default {
  component: Tree,
  parameters: {
    docs: {
      description: {
        component: 'Tree component',
      },
    },
  },
};

const trees = [
  {
    id: '1',
    uniqueId: '123',
    names: {
      fi: 'Root unit',
      en: 'Root unit',
      sv: 'Root unit',
    },
    hierarchies: ['virallinen'],
    children: [
      {
        id: '2',
        uniqueId: '123123',
        names: {
          fi: 'I have children',
          en: 'I have children',
          sv: 'I have children',
        },
        hierarchies: ['virallinen'],
        children: [
          {
            id: '4',
            names: {
              fi: "I'm a child",
              sv: "I'm a child",
              en: "I'm a child",
            },
            uniqueId: '123123123',
            hierarchies: ['virallinen'],
            children: [],
          },
        ],
      },
      {
        hierarchies: ['virallinen'],
        id: '3',
        uniqueId: '321321',
        names: {
          fi: 'Childless unit',
          sv: 'Childless unit',
          en: 'Childless unit',
        },
        children: [],
      },
    ],
  },
];
const loading = false;
const targetNodeIdentifier = '123123123';

export const LoadingTree = {
  args: {
    trees,
    loading: true,
    targetNodeIdentifier,
  },
  render: (args) => {
    return <Tree {...args} />;
  },
};

export const PopulatedTree = {
  args: {
    trees,
    loading,
    targetNodeIdentifier,
  },
  render: (args) => {
    return <Tree {...args} />;
  },
};
