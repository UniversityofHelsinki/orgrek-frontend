import React from 'react';
import { connect } from 'react-redux';
import { showValidity } from '../actions/utilAction';
import { useTranslation } from 'react-i18next';

const NodePredecessors = (props) => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            {props.predecessors && props.predecessors.length > 0   ?
                <div>
                    <h3>{t('predecessors')}</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>{t('unit')}</th>
                            <th>{t('valid_until')}</th>
                            <th>{t('predecessor_edge_valid')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.predecessors.map(node => (
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
    predecessors : state.nrd.nodePredecessors
});

export default connect(mapStateToProps, null)(NodePredecessors);
