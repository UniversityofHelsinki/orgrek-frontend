import React from 'react';
import { useTranslation } from 'react-i18next';
import { commaSep, showValidity } from '../actions/utilAction';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchNode, fetchNodeAttributes, fetchNodePredecessors, fetchNodeSuccessors } from '../actions/nodeAction';
import { fetchNodeChildren, fetchNodeParents } from '../actions/hierarchyAction';

const NodeDetailsTable = (props) => {
    const { t, i18n } = useTranslation();
    const nodeattrNs = `nodeattr${props.selectedDay ? props.selectedDay.toLocaleDateString('EN-Ca') : ''}`;

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
                return (<tr key={elem.node.id}>
                    <td onClick={() => props.onNodeSelection(elem.node.unique_id)}><a className='list-node-link' href="#">{t(elem.node.id, { ns: nodeattrNs })}</a></td>
                    <td>{commaSep(elem.hierarchies)}</td>
                </tr>);
            }

            if (props.type === 'name-validity') {
                return (<tr key={elem.nodeId}>
                    <td onClick={() => props.onNodeSelection(elem.uniqueId)}><a className='list-node-link' href="#">{t(elem.nodeId, { ns: 'nodeattr' })}</a></td>
                    <td>{showValidity(elem.startDate, elem.endDate, i18n, t)}</td>
                    <td>{showValidity(elem.edgeStartDate, elem.edgeEndDate, i18n, t)}</td>
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
    selectedDay : state.dr.selectedDay
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNodeSelection: (elemId) => {
        dispatch(fetchNode(elemId));
        dispatch(fetchNodeAttributes(elemId, ownProps.selectedDay));
        dispatch(fetchNodeParents(elemId, ownProps.selectedDay));
        dispatch(fetchNodeChildren(elemId, ownProps.selectedDay));
        dispatch(fetchNodePredecessors(elemId));
        dispatch(fetchNodeSuccessors(elemId));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(NodeDetailsTable);
