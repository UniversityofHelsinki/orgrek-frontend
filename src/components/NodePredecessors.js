import React from 'react';
import { connect } from 'react-redux';
import { showValidity } from '../actions/utilAction';

const NodePredecessors = (props) => {
    return (
        <div>
            {props.predecessors && props.predecessors.length > 0   ?
                <div>
                    <h3>Edeltävät yksiköt</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Yksikkö</th>
                            <th>Voimassaolo</th>
                            <th>Yhteyden päivämäärä</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.predecessors.map(node => (
                            <tr key={node.nodeId}>
                                <td>{node.name}</td>
                                <td>{showValidity(node.startDate, node.endDate)}</td>
                                <td>{showValidity(node.edgeStartDate, node.edgeEndDate)}</td>
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
