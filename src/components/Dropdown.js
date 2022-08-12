import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { fetchSelectableHierarchies } from '../actions/treeAction';
import { useTranslation } from 'react-i18next';
import MultiSelect from  'react-multiple-select-dropdown-lite';

const Dropdown = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const changeSelected = value => {
        const newValue = value || props.defaultHierarchy;
        dispatch(dropDownSwitchValueCall(new String(newValue)));
        // new String for causing a rerender when newValue === previous value.
    };

    if (props.selectableHierarchies?.length > 0) {
        return (
            <MultiSelect
                defaultValue={props.selectedHierarchy?.split(',') || props.defaultHierarchy}
                onChange={changeSelected}
                options={props.selectableHierarchies.filter(item => item.value !== 'history')}
                placeholder={t('select_hierarchies')}
            />
        );
    }
    return <></>;
};

export const dropDownSwitchValueCall = data => {
    return {
        type: 'SWITCH_HIERARCHY',
        payload: data
    };
};

const mapStateToProps = state => ({
    selectedHierarchy: state.tree.selectedHierarchy,
    selectableHierarchies: state.tree.selectableHierarchies,
    defaultHierarchy: state.tree.defaultHierarchy
});

export default connect(mapStateToProps)(Dropdown);
