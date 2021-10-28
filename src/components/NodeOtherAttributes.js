import { connect } from 'react-redux';
import React from 'react';
import * as Constants from '../Constants';

const NodeOtherAttributes = (props) => {
    const notOtherAttributes = Constants.notOtherAttributes;

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

    const drawAttributeList = () => {
        const otherAttributes = props.nodeAttributes.filter(attribute => !notOtherAttributes.includes(attribute.key));
        return (
            <div>
                <h3>Muut Attribuutit</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Attribuutti</th>
                        <th>Arvo</th>
                        <th>Voimassaolo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {otherAttributes.map((attribute, index) => (
                        <tr key={index}>
                            <td>{attribute.key}</td>
                            <td>{attribute.value}</td>
                            <td>{showValidity(attribute.startDate, attribute.endDate)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            {props.nodeAttributes ? drawAttributeList() : null}
        </div>);

};

const mapStateToProps = state => ({
    nodeAttributes : state.nrd.nodeAttributes
});

export default connect(mapStateToProps, null)(NodeOtherAttributes);
