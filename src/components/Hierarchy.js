import React from 'react';
import Dropdown from './Dropdown';
import Tree from './Tree';

const Hierarchy = (props) => {


    return (
        <div className="hierarcyContainer">
            <Dropdown menuItems={['talous', 'opetus']} />
            <Tree/>
        </div>
    );

};

export default Hierarchy;