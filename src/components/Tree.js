import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Branch from './Branch';
import Card from '@mui/material/Card';
import useContentLanguage from '../hooks/useContentLanguage';
import useTree from '../hooks/useTree';
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
    } else {
      const newPathsToTarget = [];
      for (let i = 0; i < (trees[language] || []).length; i++) {
        const tree = trees[language][i];
        if (tree && node?.uniqueId && openTree) {
          const foundInTree = traverseTree(tree, String(node.uniqueId));
          newPathsToTarget.push(foundInTree);
        }
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
      {trees[language].map(
        (tree, i) =>
          tree && (
            <Branch
              item={tree}
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
