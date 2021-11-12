import React from 'react';
import { connect } from 'react-redux';
import { showValidity } from '../actions/utilAction';
import { useTranslation } from 'react-i18next';

const NodeSuccessors = (props) => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            {props.successors && props.successors.length > 0   ?
                <div>
                    <h3>{t('successor_units')}</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>{t('unit')}</th>
                            <th>{t('valid_until')}</th>
                            <th>{t('predecessor_edge_valid')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.successors.map(node => (
                            <tr key={node.nodeId}>
                                <td>{node.name}</td>
                                <td>{showValidity(node.startDate, node.endDate, i18n)}</td>
                                <td>{showValidity(node.edgeStartDate, node.edgeEndDate, i18n)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div> : null
            }
        </div>
    );
};

const mapStateToProps = state => ({
    successors : state.nrd.nodeSuccessors
});

export default connect(mapStateToProps, null)(NodeSuccessors);
