import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { fetchSelectableHierarchies } from '../actions/treeAction';
import { useTranslation } from 'react-i18next';
import MultiSelect from  'react-multiple-select-dropdown-lite';

const Dropdown = (props) => {
    const { t } = useTranslation();
    const [selected, setSelected] = useState('');
    const dispatch = useDispatch();
    const all = props.selectableHierarchies;
    const filtered = all.filter(item => item.value !== 'history');

    React.useEffect(() => {
        if (filtered.length === 0) {
            dispatch(fetchSelectableHierarchies());
        }
    });

    const changeSelected = value => {
        setSelected(value);
        dispatch(dropDownSwitchValueCall(value));
    };

    React.useEffect(() => {
        if (filtered.length > 0) {
            setSelected(props.selectedHierarchy);
        } else {
            setSelected('');
        }
    // eslint-disable-next-line
    }, [selected, props.selectableHierarchies]);

    return (
        <MultiSelect
            defaultValue={selected}
            onChange={changeSelected}
            options={filtered}
        />
    );
};

export const dropDownSwitchValueCall = data => {
    return {
        type: 'SWITCH_HIERARCHY',
        payload: data
    };
};

const mapStateToProps = state => ({
    selectedHierarchy: state.tree.selectedHierarchy,
    selectableHierarchies: state.tree.selectableHierarchies
});

export default connect(mapStateToProps)(Dropdown);
