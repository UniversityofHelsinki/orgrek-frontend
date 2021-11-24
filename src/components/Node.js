import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { fetchNodeParents, fetchNodeChildren } from '../actions/hierarchyAction';
import { fetchNode, fetchNodeAttributes, fetchNodePredecessors, fetchNodeSuccessors } from '../actions/nodeAction';

const Node = (props) => {
    const { t, i18n } = useTranslation();
    const selectNameVersion = () => {
        switch (i18n.language) {
            case 'en':
                return props.item.nameEn;
            case 'fi':
                return props.item.nameFi;
            case 'sv':
                return props.item.nameSv;
            default:
                return props.item.nameFi;
        }
    };

    const nameSelectedLanguage = selectNameVersion();

    return (
        <div style={{ paddingLeft: `${props.level * 35}px` }}>
            <span style={props.node && props.node.unique_id === props.item.id
                ?  { fontWeight: 'bold', paddingRight: '10px' }
                : { paddingRight: '10px' } }
                onClick={() => props.onNodeSelection(props.selectedDay)}>
                    {props.level > 0
                    ? props.item.code
                    : ''}
                    {props.parentAbbr
                    ? ' ' + props.parentAbbr + ', '
                    : ''}
                    {nameSelectedLanguage}
                    {props.item.abbreviation
                    ? ' (' + props.item.abbreviation + ')'
                    : ''}
            </span>
            {props.hasChildren && <i data-testid={props.selected ? 'arrowdown' : 'arrowright'}  id={props.item.id} onClick={props.onToggle} className={props.selected ? 'arrow down' : 'arrow right'}></i>}
        </div>
    );
};

const mapStateToProps = state => ({
    node : state.nrd.node,
    selectedDay : state.dr.selectedDay
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNodeSelection: (selectedDay) => {
        dispatch(fetchNode(ownProps.item.id));
        dispatch(fetchNodeAttributes(ownProps.item.id, selectedDay));
        dispatch(fetchNodeParents(ownProps.item.id, selectedDay));
        dispatch(fetchNodeChildren(ownProps.item.id, selectedDay));
        dispatch(fetchNodePredecessors(ownProps.item.id));
        dispatch(fetchNodeSuccessors(ownProps.item.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Node);
