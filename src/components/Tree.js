import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Branch from './Branch';
import { fetchTree, fetchTreeWithAllHierarchies } from '../actions/treeAction';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import { useGetTreeQuery } from '../store';

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

const Tree = (props) => {
  const { i18n } = useTranslation();
  const [pathsToTarget, setPathsToTarget] = useState();
  const {
    data: tree,
    error,
    isFetching,
  } = useGetTreeQuery({
    hierarchies: props.selectedHierarchy ? props.selectedHierarchy : 'talous',
    selectedDay: props.selectedDay,
  });

  const language = i18n.language === 'ia' ? 'fi' : i18n.language;

  useEffect(() => {
    if (!props.openTree) {
      setPathsToTarget(undefined);
    }
    if (tree && tree[language] && props.node?.uniqueId && props.openTree) {
      const foundInTree = traverseTree(tree[language], props.node.uniqueId);
      if (foundInTree) {
        setPathsToTarget(foundInTree);
      }
    }
  }, [tree, props.node, props.openTree]);

  return (
    <Card
      variant="outlined"
      data-testid="tree"
      sx={{ padding: 1, ...props.sx }}
    >
      {tree?.[language] && (
        <Branch
          item={tree[language]}
          openableTree={props.openTree ? pathsToTarget : undefined}
          level={0}
          parent=""
        />
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  selectedHierarchy: state.tree.selectedHierarchy,
  selectedDay: state.dr.selectedDay,
  node: state.nrd.node,
  openTree: state.nrd.openTree,
  selectableHierarchies: state.tree.selectableHierarchies,
});

export default connect(mapStateToProps, null)(Tree);
