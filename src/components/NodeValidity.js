import React from 'react';
import { connect } from 'react-redux';

const NodeValidity = (props) => {

    const showValidity = (startDate, endDate) => {
        if (startDate && endDate) {
            return new Date(startDate).toLocaleDateString('fi-FI') + ' – ' + new Date(endDate).toLocaleDateString('fi-FI');
        }
        if (startDate) {
            return 'from_date ' + new Date(startDate).toLocaleDateString('fi-FI');
        }

        if (endDate) {
            return 'until_date ' +  new Date(endDate).toLocaleDateString('fi-FI');
        }

        return 'not_specified';
    };

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
                        <td>${showValidity(props.node.startDate, props.node.endDate)}</td>
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
