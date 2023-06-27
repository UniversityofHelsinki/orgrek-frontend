import React from 'react';
import useNavigate from '../hooks/useNavigate';
import NodeField from './inputs/NodeField';

const TreeSearch = ({ width }) => {
  const navigate = useNavigate();

  const handleChange = (event, node) => {
    if (node) {
      navigate({ node: node.id });
    }
  };

  return (
    <NodeField
      size="small"
      sx={{ width: width || 350 }}
      id="tree-search"
      variant="search"
      onChange={handleChange}
    />
  );
};

export default TreeSearch;
