import { connect } from 'react-redux';
import React from 'react';
import * as Constants from '../Constants';
import { useTranslation } from 'react-i18next';
import { showValidity } from '../actions/utilAction';

const NodeAttributes = (props) => {
    const { t, i18n } = useTranslation();
    const notOtherAttributes = Constants.notOtherAttributes;
    const codeAttributes = Constants.codeAttributes;

    const drawTypeAttributeList = () => {
        return (
            <div>
                <h3>{t('unit_type')}</h3>
                <table>
                    <thead>
                    <tr>
                        <th>{t('type')}</th>
                        <th>{t('valid_dates')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.nodeAttributes.filter(attribute => attribute.key === 'type').map((type, index) => (
                        <tr key={index}>
                            <td>{t(type.value)}</td>
                            <td>{showValidity(type.startDate, type.endDate, i18n)}</td>
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
                <h3>{t('codes')}</h3>
                <table>
                    <thead>
                    <tr>
                        <th>{t('code_namespace')}</th>
                        <th>{t('attribute_value')}</th>
                        <th>{t('valid_until')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.node ?
                        <tr>
                            <td>{t('unique_id')}</td>
                            <td>{props.node.unique_id}</td>
                        </tr> : null
                    }
                    {filteredCodeAttributes.map((attribute, index) => (
                        <tr key={index}>
                            <td>{t(attribute.key)}</td>
                            <td>{attribute.value}</td>
                            <td>{showValidity(attribute.startDate, attribute.endDate, i18n)}</td>
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
                <h3>{t('other_attributes')}</h3>
                <table>
                    <thead>
                    <tr>
                        <th>{t('attribute')}</th>
                        <th>{t('attribute_value')}</th>
                        <th>{t('valid_until')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {otherAttributes.map((attribute, index) => (
                        <tr key={index}>
                            <td>{attribute.key}</td>
                            <td>{attribute.value}</td>
                            <td>{showValidity(attribute.startDate, attribute.endDate, i18n)}</td>
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
    nodeAttributes : state.nrd.nodeAttributes,
    node : state.nrd.node
});

export default connect(mapStateToProps, null)(NodeAttributes);
