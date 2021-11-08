import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { fetchNodeParents, fetchNodeChildren } from '../actions/hierarchyAction';
import { fetchNode, fetchNodeAttributes } from '../actions/nodeAction';

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
                break;
        }
    };

    const nameSelectedLanguage = selectNameVersion();

    return (
        <div style={{ paddingLeft: `${props.level * 35}px` }}>
            <span style={{ paddingRight: '10px' }} onClick={() => props.onNodeSelection()}>{props.level > 0 ? props.item.code : ''} {nameSelectedLanguage} {props.item.abbreviation ? '(' + props.item.abbreviation + ')' : ''}</span>
            {props.hasChildren && <i data-testid={props.selected ? 'arrowdown' : 'arrowright'}  id={props.item.id} onClick={props.onToggle} className={props.selected ? 'arrow down' : 'arrow right'}></i>}
        </div>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNodeSelection: () => {
        console.log(ownProps.item);
        //dispatch(fetchNode(ownProps.item.id));
        //dispatch(fetchNodeAttributes(ownProps.item.id));
        dispatch(fetchNodeParents(ownProps.item.id));
        dispatch(fetchNodeChildren(ownProps.item.id));
    }
});

export default connect(null, mapDispatchToProps)(Node);
