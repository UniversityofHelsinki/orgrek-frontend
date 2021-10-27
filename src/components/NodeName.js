import { connect } from 'react-redux';
import React from 'react';

const NodeName = (props) => {

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
            {props.nodeAttributes  ?
                <table>
                    <thead>
                        <tr>
                            <th>kieli</th>
                            <th>Nimi</th>
                            <th>Voimassaolo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.nodeAttributes.name_fi ? props.nodeAttributes.name_fi.map(nameFi => (
                            <tr key={nameFi.key}>
                                <td>Suomi</td>
                                <td>{nameFi.value}</td>
                                <td>{showValidity(nameFi.startDate, nameFi.endDate)}</td>
                            </tr>
                        )) : null}
                        {props.nodeAttributes.name_en ? props.nodeAttributes.name_en.map(nameEn => (
                            <tr key={nameEn.key}>
                                <td>Englanti</td>
                                <td>{nameEn.value}</td>
                                <td>{showValidity(nameEn.startDate, nameEn.endDate)}</td>
                            </tr>
                        )) : null}
                        {props.nodeAttributes.name_sv ? props.nodeAttributes.name_sv.map(nameSV => (
                            <tr key={nameSV.key}>
                                <td>Ruotsi</td>
                                <td>{nameSV.value}</td>
                                <td>{showValidity(nameSV.startDate, nameSV.endDate)}</td>
                            </tr>
                        )) : null}
                    </tbody>
                </table> : null
            }
        </div>
    );
};


const mapStateToProps = state => ({
    nodeAttributes : state.nrd.nodeAttributes
});

export default connect(mapStateToProps, null)(NodeName);
