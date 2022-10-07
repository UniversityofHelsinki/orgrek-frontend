import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const AttributeDropDown = (props) => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const handleSelect=(event) => {
        setValue(event.target.value);
        props.onAttributeChange(event.target.value);
    };

    const validAttributes = ( (availableAttributes) => {
        let validAttr = availableAttributes;
        let selectedHierarchiesArrayList = props.selectedHierarchy.split(',');
        if (selectedHierarchiesArrayList.length !== (props.selectableHierarchies.length -1)) {
            validAttr = validAttr.filter((s) => {
                return !s.match('mainari_tunnus') && !s.match('laskutus_tunnus');
            });
        }
        if (!props.selectedHierarchy.includes('henkilosto')) {
            validAttr = validAttr.filter((s) => {
                return !s.match('hr_lyhenne') && !s.match('hr_tunnus');
            });
        }
        if (!props.selectedHierarchy.includes('tutkimus')) {
            validAttr = validAttr.filter((s) => !s.match('tutkimus_tunnus'));
        }
        if (!props.selectedHierarchy.includes('opetus')) {
            validAttr = validAttr.filter((s) => !s.match('oppiaine_tunnus'));
        }
        if (!props.selectedHierarchy.includes('talous')) {
            validAttr = validAttr.filter((s) => !s.match('talous_tunnus'));
        }
        return validAttr;
    });

    return (
        <div>
            {props.availableAttributes &&
                <>
                    <select value={value} onChange={handleSelect}>
                        <option value="">-</option>
                        {validAttributes(props.availableAttributes).map((option, i) => (
                            <option key={i} value={option}>{t(option)}</option>
                        ))}
                    </select>
                </>
            }
        </div>
    );
};


const mapStateToProps = state => ({
    selectableHierarchies : state.tree.selectableHierarchies,
    selectedHierarchy: state.tree.selectedHierarchy,
});

export default connect(mapStateToProps)(AttributeDropDown);
