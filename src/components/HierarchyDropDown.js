import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const HierarchyDropDown = (props) => {
    const [value, setValue] = useState('');
    const [selectedHierarchies, setSelectedHierarchies] = useState([]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        const arr = props.selectedHierarchy.split(',');
        setSelectedHierarchies(arr);
    }, [props.selectedHierarchy]);

    return (
        <div>
            <select value={value} onChange={handleChange} >
                {selectedHierarchies.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );

};

const mapStateToProps = state => ({
    selectedHierarchy: state.tree.selectedHierarchy
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, null)(HierarchyDropDown);
