import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Branch from './Branch';
import Card from '@mui/material/Card';
import useContentLanguage from '../hooks/useContentLanguage';
import useTree from '../hooks/useTree';
import { Skeleton } from '@mui/material';

const traverseTree = (current, target) => {
  if (current.uniqueId === target) {
    return [[current]];
  }
  const paths = [];
  for (const child of current.children) {
    const subpaths = traverseTree(child, target);
    if (subpaths.length > 0) {
      subpaths.forEach((subpath) => paths.push([current, ...subpath]));
    }
  }
  return paths;
};

const Tree = ({ sx }) => {
  const [pathsToTarget, setPathsToTarget] = useState([]);
  const { trees, isFetching } = useTree();
  const { node, openTree } = useSelector((state) => ({
    node: state.nrd.node,
    openTree: state.nrd.openTree,
  }));

  const language = useContentLanguage();

  useEffect(() => {
    if (!openTree) {
      setPathsToTarget(undefined);
    }
    const newPathsToTarget = [];
    for (let i = 0; i < (trees || []).length; i++) {
      const tree = trees[i];
      if (tree && tree[language] && node?.uniqueId && openTree) {
        const foundInTree = traverseTree(tree[language], node.uniqueId);
        newPathsToTarget.push(foundInTree);
      }
      setPathsToTarget(newPathsToTarget);
    }
  }, [trees, node, openTree]);

  if (isFetching) {
    return <Skeleton variant="rectangular" sx={sx} height={162} />;
  }

  return (
    <Card
      variant="outlined"
      data-testid="tree"
      sx={[{ padding: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {trees.map(
        (tree, i) =>
          tree?.[language] && (
            <Branch
              item={tree[language]}
              openableTree={openTree ? pathsToTarget?.[i] : undefined}
              level={0}
              parent=""
              key={i}
            />
          )
      )}
    </Card>
  );
};

export default Tree;
