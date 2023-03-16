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
  const [pathsToTarget, setPathsToTarget] = useState();
  const { tree, isFetching } = useTree();
  const { node, openTree } = useSelector((state) => ({
    node: state.nrd.node,
    openTree: state.nrd.openTree,
  }));

  const language = useContentLanguage();

  useEffect(() => {
    if (!openTree) {
      setPathsToTarget(undefined);
    }
    if (tree && tree[language] && node?.uniqueId && openTree) {
      const foundInTree = traverseTree(tree[language], node.uniqueId);
      if (foundInTree) {
        setPathsToTarget(foundInTree);
      }
    }
  }, [tree, node, openTree]);

  if (isFetching) {
    return <Skeleton variant="rectangular" sx={sx} height={162} />;
  }

  return (
    <Card
      variant="outlined"
      data-testid="tree"
      sx={[{ padding: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {tree?.[language] && (
        <Branch
          item={tree[language]}
          openableTree={openTree ? pathsToTarget : undefined}
          level={0}
          parent=""
        />
      )}
    </Card>
  );
};

export default Tree;
