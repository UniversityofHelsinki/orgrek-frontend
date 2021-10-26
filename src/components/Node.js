import React from 'react';
import { connect } from 'react-redux';
import { fetchNode } from '../actions/nodeAction';

const Node = (props) => {
    return (
        <div style={{ paddingLeft: `${props.level * 35}px` }}>
            <span style={{ paddingRight: '10px' }} onClick={() => props.onNodeSelection()}>{props.level > 0 ? props.item.code : ''} {props.item.nameFi} {props.item.abbreviation ? '(' + props.item.abbreviation + ')' : ''}</span>
            {props.hasChildren && <i id={props.item.id} onClick={props.onToggle} className={props.selected ? 'arrow down' : 'arrow right'}></i>}
        </div>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNodeSelection: () => dispatch(fetchNode(ownProps.item.id))
});

export default connect(null, mapDispatchToProps)(Node);
