import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Branch from './Branch';
import { fetchTree, fetchTreeWithAllHierarchies } from '../actions/treeAction';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #F6F6F6;
`;

const traverseTree = (current, target) => {
    if (current.uniqueId === target) {
        return [[current]];
    }
    const paths = [];
    for (const child of current.children) {
        const subpaths = traverseTree(child, target);
        if (subpaths.length > 0) {
            subpaths.forEach(subpath => paths.push([current, ...subpath]));
        }
    }
    return paths;
};

const Tree = (props) => {
    const { t, i18n } = useTranslation();
    const [pathsToTarget, setPathsToTarget] = useState();

    useEffect(() => {
        if (props.selectedHierarchy) {
            props.onFetchTree(props.selectedHierarchy, props.selectedDay);
        }
        // eslint-disable-next-line
    }, [props.selectedHierarchy, props.selectedDay]);

    useEffect(() => {
        if (props.selectableHierarchies && props.selectableHierarchies.length > 0) {
            const selectableHierarchies = props.selectableHierarchies.filter(item => item !== 'history');
            props.onFetchTreeWithAllHierarchies(selectableHierarchies);
        }
        // eslint-disable-next-line
    }, [props.selectableHierarchies]);

    const language = i18n.language === 'ia' ? 'fi' : i18n.language;

    useEffect(() => {
        if (!props.openTree) {
            setPathsToTarget(undefined);
        }
        if (props.tree[language] && props.node?.uniqueId && props.openTree) {
            const foundInTree = traverseTree(props.tree[language], props.node.uniqueId);
            if (foundInTree) {
                setPathsToTarget(foundInTree);
            }
        }
    }, [props.tree, props.node, props.openTree]);


    return (
        <ContainerDiv data-testid='tree'>
            {props.tree?.[language] && <Branch item={props.tree[language]} openableTree={props.openTree ? pathsToTarget : undefined} level={0} parent='' />}
        </ContainerDiv>
    );
};

const mapStateToProps = state => ({
    tree : state.tree.tree,
    selectedHierarchy: state.tree.selectedHierarchy,
    selectedDay : state.dr.selectedDay,
    node: state.nrd.node,
    openTree: state.nrd.openTree,
    selectableHierarchies : state.tree.selectableHierarchies
});

const mapDispatchToProps = dispatch => ({
    onFetchTree: (selection, selectedDay) => dispatch(fetchTree(selection, selectedDay)),
    onFetchTreeWithAllHierarchies: (allHierarchies) => dispatch(fetchTreeWithAllHierarchies(allHierarchies))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
