import React from 'react';
import useNavigate from '../hooks/useNavigate';
import NodeField from './inputs/NodeField';

const TreeSearch = () => {
  const navigate = useNavigate();

  const handleChange = (event, node) => {
    if (node) {
      navigate({ node: node.uniqueId });
    }
  };

  return <NodeField id="tree-search" freeSolo onChange={handleChange} />;
};

export default TreeSearch;
