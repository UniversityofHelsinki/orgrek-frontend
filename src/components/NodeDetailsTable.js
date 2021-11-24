import React from 'react';
import { useTranslation } from 'react-i18next';
import { commaSep, showValidity } from '../actions/utilAction';
import { Table } from 'react-bootstrap';

const NodeDetailsTable = ({ selectedDay, type, heading, tableLabels, contentData, hasValidity } ) => {
    const { t, i18n } = useTranslation();
    const nodeattrNs = `nodeattr${selectedDay ? selectedDay.toLocaleDateString('EN-Ca') : ''}`;

    const renderTableHeader = () => {
        return (
            <tr key={heading}>
                {tableLabels ? tableLabels.map((label) => {
                    return <th key={heading + label}>{t(label)}</th>;
                }) : <></>
                }
                {hasValidity && tableLabels.length !== 0 ?
                    <th key={heading + 'valid'}>{t('valid_dates')}</th> : <></>}
            </tr>
        );
    };

    const renderTableData = () => {
        return contentData ? contentData.map((elem, index) => {
            if (type === 'key-value') {
                return (<tr key={index}>
                    <td>{t(elem.key)}</td>
                    <td>{t(elem.value)}</td>
                    {hasValidity ? <td>{t(showValidity(elem.startDate, elem.endDate, i18n, t))}</td> : <></>}
                </tr>);
            }

            if (type === 'node-hierarchy') {
                return (<tr key={elem.node.id}>
                    <td>{t(elem.node.id, { ns: nodeattrNs })}</td>
                    <td>{commaSep(elem.hierarchies)}</td>
                </tr>);
            }

            if (type === 'name-validity') {
                return (<tr key={elem.nodeId}>
                    <td>{t(elem.nodeId, { ns: 'nodeattr' })}</td>
                    <td>{showValidity(elem.startDate, elem.endDate, i18n, t)}</td>
                    <td>{showValidity(elem.edgeStartDate, elem.edgeEndDate, i18n, t)}</td>
                </tr>);
            }

        }) : null;
    };

    return (
        <>
            <h4>{t(heading)}</h4>
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

export default NodeDetailsTable;
