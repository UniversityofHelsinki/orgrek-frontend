import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    commaSepWithTranslate,
    showValidity,
    showHierarchyDisplayNameByLanguage,
    hierarchyDates
} from '../actions/utilAction';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    fetchNode,
    fetchNodeAttributes, fetchNodeAttributesFuture,
    fetchNodeAttributesHistory,
    fetchNodePredecessors,
    fetchNodeSuccessors
} from '../actions/nodeAction';
import {
    fetchNodeChildren, fetchNodeChildrenFuture,
    fetchNodeChildrenHistory,
    fetchNodeParents, fetchNodeParentsFuture,
    fetchNodeParentsHistory
} from '../actions/hierarchyAction';

const NodeDetailsTable = (props) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const renderTableHeader = () => {
        return (
            <tr key={props.heading}>
                {props.tableLabels ? props.tableLabels.map((label) => {
                    return <th key={props.heading + label}>{t(label)}</th>;
                }) : <></>
                }
                {props.hasValidity && props.tableLabels.length !== 0 ?
                    <th key={props.heading + 'valid'}>{t('valid_dates')}</th> : <></>}
            </tr>
        );
    };

    const renderTableData = () => {
        return props.contentData ? props.contentData.map((elem, index) => {

            if (props.type === 'key-value') {
                return (<tr key={index}>
                    <td>{t(elem.key)}</td>
                    <td>{t(elem.value)}</td>
                    {props.hasValidity ? <td>{t(showValidity(elem.startDate, elem.endDate, i18n, t))}</td> : <></>}
                </tr>);
            }

            if (props.type === 'node-hierarchy') {
                return (<><tr key={elem.node.id + index}>
                    <td onClick={() => props.onNodeSelection(elem.node.unique_id, props.showHistory, props.showComing)}>
                        <a className='list-node-link' href="#">
                            {showHierarchyDisplayNameByLanguage(elem, lang) ? showHierarchyDisplayNameByLanguage(elem, lang) : elem.node.name}
                        </a></td>
                    <td>{commaSepWithTranslate(elem.hierarchies, t)}</td>
                        </tr>
                <tr key={'row2' + elem.node.id}>
                    <td></td>
                    <td>{hierarchyDates(elem.hierarchies, i18n, t)}</td>
                </tr></>);
            }

            if (props.type === 'name-validity') {
                return (<tr key={elem.nodeEdgeHistoryWrapper.id}>
                    <td onClick={() => props.onNodeSelection(elem.nodeEdgeHistoryWrapper.unique_id, props.showHistory, props.showComing)}>
                        <a className='list-node-link' href="#">
                            {showHierarchyDisplayNameByLanguage(elem, lang) ? showHierarchyDisplayNameByLanguage(elem, lang) : elem.nodeEdgeHistoryWrapper.name }
                        </a></td>
                    <td>{showValidity(elem.nodeEdgeHistoryWrapper.startDate, elem.nodeEdgeHistoryWrapper.endDate, i18n, t)}</td>
                    <td>{showValidity(elem.nodeEdgeHistoryWrapper.edgeStartDate, elem.nodeEdgeHistoryWrapper.edgeEndDate, i18n, t)}</td>
                </tr>);
            }

        }) : null;
    };

    return (
        <>
            <h4>{t(props.heading)}</h4>
            <Table size="sm" data-testid='node-details-table'>
                <thead>
                {renderTableHeader()}
                </thead>
                <tbody>
                {renderTableData()}
                </tbody>
            </Table>
        </>
    );
};

const mapStateToProps = state => ({
    selectedDay : state.dr.selectedDay,
    showHistory: state.nvrd.showHistory,
    showComing: state.nvrd.showComing
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNodeSelection: (elemId, showHistory, showComing) => {
        dispatch(fetchNode(elemId));
        dispatch(fetchNodeAttributes(elemId, ownProps.selectedDay));
        dispatch(fetchNodeParents(elemId, ownProps.selectedDay));
        dispatch(fetchNodeChildren(elemId, ownProps.selectedDay));
        dispatch(fetchNodePredecessors(elemId, ownProps.selectedDay));
        dispatch(fetchNodeSuccessors(elemId, ownProps.selectedDay));

        if (showHistory) {
            dispatch(fetchNodeParentsHistory(elemId, ownProps.selectedDay));
            dispatch(fetchNodeChildrenHistory(elemId, ownProps.selectedDay));
            dispatch(fetchNodeAttributesHistory(elemId, ownProps.selectedDay));
        }
        if (showComing) {
            dispatch(fetchNodeParentsFuture(elemId, ownProps.selectedDay));
            dispatch(fetchNodeChildrenFuture(elemId, ownProps.selectedDay));
            dispatch(fetchNodeAttributesFuture(elemId, ownProps.selectedDay));
        }

    }
});


export default connect(mapStateToProps, mapDispatchToProps)(NodeDetailsTable);
