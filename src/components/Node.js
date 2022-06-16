import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { selectNameVersion, datesOverlap } from '../actions/utilAction';
import {
    fetchNodeParents,
    fetchNodeChildren,
    fetchNodeParentsHistory,
    fetchNodeChildrenHistory, fetchNodeParentsFuture, fetchNodeChildrenFuture
} from '../actions/hierarchyAction';
import {
    fetchNode,
    fetchNodeAttributes, fetchNodeAttributesFuture,
    fetchNodeAttributesHistory,
    fetchNodePredecessors,
    fetchNodeSuccessors
} from '../actions/nodeAction';

const Node = (props) => {

    const { t, i18n } = useTranslation();

    const nameSelectedLanguage = selectNameVersion(i18n, props.item);

    useEffect(() => {
        if (props.node && props.node.uniqueId === props.item.id) {
            props.onNodeSelection();
        }
    }, [props.selectedDay]);

    return (
        <div style={{ display: 'flex', cursor:'pointer', paddingLeft: `${props.level * 35}px` }}>
             {props.hasChildren
                && <div><i
                data-testid={props.selected ? 'arrowdown' : 'arrowright'}
                id={props.item.id}
                onClick={props.onToggle}
                onKeyUp={(e) => e.key === 'Enter' && props.onToggle()}
                tabIndex={0}
                className={props.selected ? 'arrow down' : 'arrow right'}>
                </i></div>}
            <span className={props.node && props.node.uniqueId === props.item.id
                ? 'nodeLinkSelected'
                : 'nodeLink'}
                onClick={() => props.onNodeSelection(props.selectedDay, props.showHistory, props.showComing)}
                onKeyUp={(e) => e.key === 'Enter' && props.onNodeSelection(props.selectedDay, props.showHistory, props.showComing)} tabIndex={0}>
                    {props.level > 0 && props.item.code && !props.item.code.includes('NO_CODE')
                    ? props.item.code + ' '
                    : ''}
                    {props.parentAbbr
                    ? props.parentAbbr + ', '
                    : ''}
                    {nameSelectedLanguage}
                    {props.item.abbreviation
                    ? ' (' + props.item.abbreviation + ')'
                    : ''}
            </span>
        </div>
    );
};

const mapStateToProps = state => ({
    node : state.nrd.node,
    selectedDay : state.dr.selectedDay,
    showHistory: state.nvrd.showHistory,
    showComing: state.nvrd.showComing
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNodeSelection: (selectedDay, showHistory, showComing) => {
        dispatch(fetchNode(ownProps.item.id));
        dispatch(fetchNodeAttributes(ownProps.item.id, selectedDay));
        dispatch(fetchNodeParents(ownProps.item.id, selectedDay));
        dispatch(fetchNodeChildren(ownProps.item.id, selectedDay));
        dispatch(fetchNodePredecessors(ownProps.item.id, selectedDay));
        dispatch(fetchNodeSuccessors(ownProps.item.id, selectedDay));

        if (showHistory) {
            dispatch(fetchNodeParentsHistory(ownProps.item.id, selectedDay));
            dispatch(fetchNodeChildrenHistory(ownProps.item.id, selectedDay));
            dispatch(fetchNodeAttributesHistory(ownProps.item.id, selectedDay));
        }
        if (showComing) {
            dispatch(fetchNodeParentsFuture(ownProps.item.id, selectedDay));
            dispatch(fetchNodeChildrenFuture(ownProps.item.id, selectedDay));
            dispatch(fetchNodeAttributesFuture(ownProps.item.id, selectedDay));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Node);
