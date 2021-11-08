import React from 'react';
import { connect } from 'react-redux';
import { showValidity } from '../actions/utilAction';

const NodeValidity = (props) => {
    return (
        <div>
            {props.node  ?
                <table>
                    <thead>
                    <tr>
                        <th>Voimassaolo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Voimassaolo</td>
                        <td>{showValidity(props.node.startDate, props.node.endDate)}</td>
                    </tr>
                    </tbody>
                </table> : null
            }
        </div>
    );
};

const mapStateToProps = state => ({
    node : state.nrd.node
});


export default connect(mapStateToProps, null)(NodeValidity);
