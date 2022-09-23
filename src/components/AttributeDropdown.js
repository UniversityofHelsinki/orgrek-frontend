import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const AttributeDropDown = (props) => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const handleSelect=(value) => {
        setValue(value);
        props.onAttributeChange(value);
    };

    const validAttributes = ( (availableAttributes) => {
        let validAttr = availableAttributes;
        let countOfSelHier = props.selectedHierarchy.split(',');
        if (countOfSelHier.length !== (props.selectableHierarchies.length -1)) { //-1 because 'history' is included
            validAttr = validAttr.filter((s) => {//all hierarchies should be selected to show mainari and laskutus
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
            validAttr = validAttributes.filter((s) => !s.match('talous_tunnus'));
        }
        return validAttr;
    });

    return (
        <div>
            {props.availableAttributes &&
                <>
                    <DropdownButton
                        title={t(props.attributeValue) ? t(props.attributeValue) : t(value) ?  t(value) : '---'}
                        onSelect={handleSelect} >
                            {validAttributes(props.availableAttributes).map((option, i) => (
                                <Dropdown.Item key={i} eventKey={option} >{t(option)}</Dropdown.Item>
                            ))}
                    </DropdownButton>
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
