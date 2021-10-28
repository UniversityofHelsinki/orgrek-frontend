import { connect } from 'react-redux';
import React from 'react';
import * as Constants from '../Constants';

const NodeAttributes = (props) => {
    const notOtherAttributes = Constants.notOtherAttributes;
    const codeAttributes = Constants.codeAttributes;

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

    const drawTypeAttributeList = () => {
        return (
            <div>
                <h3>Yksikön tyyppi</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Tyyppi</th>
                        <th>Voimassaolo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.nodeAttributes.filter(attribute => attribute.key === 'type').map((type, index) => (
                        <tr key={index}>
                            <td>{type.value}</td>
                            <td>{showValidity(type.startDate, type.endDate)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const drawCodeAttributeList = () => {
        const filteredCodeAttributes = props.nodeAttributes.filter(attribute => codeAttributes.includes(attribute.key));
        return (
            <div>
                <h3>Koodisto</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Koodi</th>
                        <th>Arvo</th>
                        <th>Voimassaolo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCodeAttributes.map((attribute, index) => (
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

    const drawOtherAttributeList = () => {
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
            {props.nodeAttributes ? drawCodeAttributeList() : null}
            {props.nodeAttributes ? drawTypeAttributeList() : null}
            {props.nodeAttributes ? drawOtherAttributeList() : null}
        </div>);

};

const mapStateToProps = state => ({
    nodeAttributes : state.nrd.nodeAttributes
});

export default connect(mapStateToProps, null)(NodeAttributes);
