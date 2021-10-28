import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material/';
import { useDispatch, connect } from 'react-redux';
import { fetchSelectableHierarchies } from '../actions/treeAction';

const Dropdown = (props) => {
    const [selected, setSelected] = useState('');
    const dispatch = useDispatch();
    const all = props.selectableHierarchies;
    const filtered = all.filter(item => item !== 'history');

    React.useEffect(() => {
        if (filtered.length === 0) {
            dispatch(fetchSelectableHierarchies());
        }
    });
    const changeSelected = (event) => {
        setSelected(event.target.value);
        dispatch(dropDownSwitchValueCall(event.target.value));
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
        <Select
            data-testid="dropdown"
            labelId="hierarchy-selector"
            id="hierarchy-select"
            value={selected}
            onChange={changeSelected}
        >
            {filtered.length > 0 ? filtered.map((item) => {
                return <MenuItem key={item} value={item}>{item}</MenuItem>;
            }) : <MenuItem key='' value=''>{''}</MenuItem>}
        </Select>
    );
};

export const dropDownSwitchValueCall = data => {
    return {
        type: 'SWITCH_HIERARCHY',
        payload: data
    };
};

const mapStateToProps = state => ({
    tree : state.tree.tree,
    selectedHierarchy: state.tree.selectedHierarchy,
    selectableHierarchies: state.tree.selectableHierarchies
});

export default connect(mapStateToProps)(Dropdown);
