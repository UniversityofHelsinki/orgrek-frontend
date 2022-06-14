import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    commaSepWithTranslate,
    showValidity,
    showHierarchyDisplayNameByLanguage,
    hierarchyDate,
    hierarchyDates
} from '../actions/utilAction';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';

const ListLink = styled.a`
  text-decoration: none;
  color: #337ab7;
`;

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
import { blue } from '@mui/material/colors';

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
        return props.contentData ? (props.dataFilter ? props.dataFilter(props.contentData) : props.contentData).map((elem, index) => {

            if (props.type === 'key-value') {
                return (<tr key={index}>
                    <td>{t(elem.key)}</td>
                    <td>{t(elem.value)}</td>
                    {props.hasValidity ? <td>{t(showValidity(elem.startDate, elem.endDate, i18n, t))}</td> : <></>}
                </tr>);
            }

            if (props.type === 'node-hierarchy') {
                return (<React.Fragment key={elem.node.id}>
                        <tr>
                            <td onClick={() => props.onNodeSelection(elem.node.unique_id, props.showHistory, props.showComing)}>
                                <ListLink href="#">
                                    {showHierarchyDisplayNameByLanguage(elem, lang) ? showHierarchyDisplayNameByLanguage(elem, lang) : elem.node.name}
                                </ListLink></td>
                            {elem.hierarchies.length > 0 &&
                                <>
                                    <td>{t(elem.hierarchies[0].type)}</td>
                                    <td>{hierarchyDate(elem.hierarchies[0], i18n, t)}</td>
                                </>
                            }
                        </tr>
                        {elem.hierarchies.slice(1).map((hierarchy, i) =>
                            <tr key={i + hierarchy.nodeId}>
                                <td></td>
                                <td>{t(hierarchy.type)}</td>
                                <td>{hierarchyDate(hierarchy, i18n, t)}</td>
                            </tr>
                        )}
                    </React.Fragment>
                );
            }

            if (props.type === 'name-validity') {
                return (<tr key={elem.nodeEdgeHistoryWrapper.id}>
                    <td onClick={() => props.onNodeSelection(elem.nodeEdgeHistoryWrapper.uniqueId, props.showHistory, props.showComing)}>
                        <ListLink href="#">
                            {showHierarchyDisplayNameByLanguage(elem, lang) ? showHierarchyDisplayNameByLanguage(elem, lang) : elem.nodeEdgeHistoryWrapper.name }
                        </ListLink></td>
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
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(NodeDetailsTable);
