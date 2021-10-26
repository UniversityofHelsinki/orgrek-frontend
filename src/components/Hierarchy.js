import React from 'react';
import Dropdown from './Dropdown';
import Tree from './Tree';

const Hierarchy = (props) => {


    return (
        <div className="hierarchyContainer">
            <Dropdown menuItems={['talous', 'opetus']} />
            <Tree/>
        </div>
    );

};

export default Hierarchy;
