import React from 'react';
import { connect } from 'react-redux';
import { showValidity } from '../actions/utilAction';

const NodeSuccessors = (props) => {
    return (
        <div>
            {props.successors && props.successors.length > 0   ?
                <div>
                    <h3>Seuraavat yksiköt</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Yksikkö</th>
                            <th>Voimassaolo</th>
                            <th>Yhteyden päivämäärä</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.successors.map(node => (
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
    successors : state.nrd.nodeSuccessors
});

export default connect(mapStateToProps, null)(NodeSuccessors);
