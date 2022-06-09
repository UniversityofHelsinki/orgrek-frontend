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
            <span style={props.node && props.node.uniqueId === props.item.id
                ?  { fontWeight: 'bold', paddingRight: '10px', marginLeft: '5px', color:'#107eab' }
                : { paddingRight: '10px', marginLeft: '5px', color:'#333' } }
                onClick={() => props.onNodeSelection()}
                onKeyUp={(e) => e.key === 'Enter' && props.onNodeSelection()} tabIndex={0}>
                    {props.level > 0 && props.item.code
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
    onNodeSelection: () => {
        dispatch(fetchNode(ownProps.item.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Node);
