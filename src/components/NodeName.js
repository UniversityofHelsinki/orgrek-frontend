import { connect } from 'react-redux';
import React from 'react';
import { showValidity } from '../actions/utilAction';
import { useTranslation } from 'react-i18next';

const NodeName = (props) => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            {props.nodeAttributes  ?
                <div>
                    <h3>{t('name_info')}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>{t('language')}</th>
                                <th>{t('unit_name_header')}</th>
                                <th>{t('valid_until')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.nodeAttributes.filter(attribute => attribute.key === 'name_fi').map(nameFi => (
                                <tr key={nameFi.key}>
                                    <td>{t('finnish')}</td>
                                    <td>{nameFi.value}</td>
                                    <td>{showValidity(nameFi.startDate, nameFi.endDate, i18n)}</td>
                                </tr>
                            ))}
                            {props.nodeAttributes.filter(attribute => attribute.key === 'name_en').map(nameEn => (
                                <tr key={nameEn.key}>
                                    <td>{t('english')}</td>
                                    <td>{nameEn.value}</td>
                                    <td>{showValidity(nameEn.startDate, nameEn.endDate, i18n)}</td>
                                </tr>
                            ))}
                            {props.nodeAttributes.filter(attribute => attribute.key === 'name_sv').map(nameSV => (
                                <tr key={nameSV.key}>
                                    <td>{t('swedish')}</td>
                                    <td>{nameSV.value}</td>
                                    <td>{showValidity(nameSV.startDate, nameSV.endDate, i18n)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>: null
            }
        </div>
    );
};


const mapStateToProps = state => ({
    nodeAttributes : state.nrd.nodeAttributes
});

export default connect(mapStateToProps, null)(NodeName);
