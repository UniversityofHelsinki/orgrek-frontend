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

    return (
        <div>
            {props.availableAttributes &&
                <>
                    <DropdownButton
                        title={t(props.attributeValue) ? t(props.attributeValue) : t(value) ?  t(value) : '---'}
                        onSelect={handleSelect} >
                            {props.availableAttributes.map((option, i) => (
                                <Dropdown.Item key={i} eventKey={option} >{t(option)}</Dropdown.Item>
                            ))}
                    </DropdownButton>
                </>
            }
        </div>
    );
};

export default connect()(AttributeDropDown);
