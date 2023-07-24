import React, { memo, useEffect, useRef, useState } from 'react';
import TreeItem from './TreeItem';
import { Card, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const defaultGetNodeIdentifier = (node) => node.uniqueId;

const calculateNodesInPathTarget = (node, isTarget, results = new Map()) => {
  if (isTarget(node)) {
    results.set(node, true);
    return;
  }
  for (const child of node.children) {
    calculateNodesInPathTarget(child, isTarget, results);
    if (results.has(child)) {
      results.set(node, true);
    }
  }
};

const Tree = memo(function Tree({
  trees,
  loading,
  targetNodeIdentifier,
  getNodeIdentifier = defaultGetNodeIdentifier,
}) {
  const containerRef = useRef();
  const [selectedItem, setSelectedItem] = useState();
  const isTarget = (node) => getNodeIdentifier(node) === targetNodeIdentifier;
  const [paths, setPaths] = useState(new Map());

  useEffect(() => {
    const newPaths = new Map();
    for (const rootNode of trees) {
      calculateNodesInPathTarget(rootNode, isTarget, newPaths);
    }
    setPaths(newPaths);
  }, [trees, targetNodeIdentifier]);

  const { t } = useTranslation();

  if (loading) {
    return <Skeleton variant="rectangular" height={256} />;
  }

  const containerProps = {
    role: 'tree',
    'aria-label': t('tree_container_label'),
    'aria-multiselectable': false,
    style: {
      marginBottom: '0px',
    },
  };

  const handleClick = (node) => {
    setSelectedItem(node);
  };

  const listOfVisibleElements = () => {
    const container = containerRef.current;
    const visibleItems = container.querySelectorAll('li:not([hidden])');
    return visibleItems;
  };

  const firstVisible = () => {
    return listOfVisibleElements()[0];
  };

  const lastVisible = () => {
    const elements = listOfVisibleElements();
    return elements[elements.length - 1];
  };

  const adjacentVisible = (start, direction) => {
    if (containerRef.current) {
      const visibleItems = listOfVisibleElements();
      for (let i = 0; i < visibleItems.length; i++) {
        const next = visibleItems[i];
        if (next === start) {
          // the modulo of (i-1) and visibleItems.length to make it roll around
          const index =
            (((i + direction) % visibleItems.length) + visibleItems.length) %
            visibleItems.length;
          return visibleItems[index];
        }
      }
    }
    return null;
  };

  const previousVisible = (start) => {
    return adjacentVisible(start, -1);
  };

  const nextVisible = (start) => {
    return adjacentVisible(start, +1);
  };

  const asTree = (rootNode) => {
    return (
      <ul key={rootNode.id} {...containerProps}>
        <TreeItem
          root={rootNode}
          onClick={handleClick}
          visible={true}
          selectedItem={selectedItem}
          previousVisible={previousVisible}
          nextVisible={nextVisible}
          firstVisible={firstVisible}
          lastVisible={lastVisible}
          targetNodeIdentifier={targetNodeIdentifier}
          getNodeIdentifier={getNodeIdentifier}
          expandOnLoad={true}
          paths={paths}
        />
      </ul>
    );
  };

  return (
    <Card
      role="region"
      variant="outlined"
      sx={{ border: '0px' }}
      ref={containerRef}
    >
      {trees.map(asTree)}
    </Card>
  );
});

Tree.propTypes = {
  /**
   * List of root nodes. Every root node object should at least
   * have a "children" property. "children" property is a list of
   * similar nodes.
   * */
  trees: PropTypes.array.isRequired,
  /**
   * Whether the trees are loading or not. A skeleton
   * indicating loading is shown if true.
   * */
  loading: PropTypes.bool.isRequired,
  /**
   * This component can find a specific node from the tree.
   * This is used to identify the node to be found.
   * If found, then the parents of the target are expanded
   * automatically on load.
   * */
  targetNodeIdentifier: PropTypes.any.isRequired,
};

export default Tree;
