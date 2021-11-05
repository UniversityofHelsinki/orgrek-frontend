import React from 'react';
import { connect } from 'react-redux';
import { fetchNodeParents, fetchNodeChildren } from '../actions/hierarchyAction';
import { fetchNode, fetchNodeAttributes } from '../actions/nodeAction';

const Node = (props) => {
    return (
        <div style={{ paddingLeft: `${props.level * 35}px` }}>
            <span style={{ paddingRight: '10px' }} onClick={() => props.onNodeSelection(props.selectedDay)}>{props.level > 0 ? props.item.code : ''} {props.item.nameFi} {props.item.abbreviation ? '(' + props.item.abbreviation + ')' : ''}</span>
            {props.hasChildren && <i data-testid={props.selected ? 'arrowdown' : 'arrowright'}  id={props.item.id} onClick={props.onToggle} className={props.selected ? 'arrow down' : 'arrow right'}></i>}
        </div>
    );
};

const mapStateToProps = state => ({
    selectedDay : state.dr.selectedDay
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNodeSelection: (selectedDay) => {
        dispatch(fetchNode(ownProps.item.id));
        dispatch(fetchNodeAttributes(ownProps.item.id));
        dispatch(fetchNodeParents(ownProps.item.id, selectedDay));
        dispatch(fetchNodeChildren(ownProps.item.id, selectedDay));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Node);
