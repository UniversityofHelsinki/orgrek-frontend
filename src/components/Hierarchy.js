import React from 'react';
import Dropdown from './Dropdown';
import Tree from './Tree';
import SelectDate from './SelectDate';

const Hierarchy = () => {
    return (
        <div className="hierarchyContainer">
            <SelectDate/>
            <Dropdown/>
            <Tree/>
        </div>
    );
};

export default Hierarchy;
