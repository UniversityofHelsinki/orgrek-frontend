import React, { useState } from 'react';

import Node from './Node'

const Branch = ({ item, level }) => {
    const [selected, setSelected] = useState(true); // open tree on load
    const hasChildren = item.children && item.children.length !== 0;

    const renderBranches = () => {
        if (hasChildren) {
            const newLevel = level + 1;

            return item.children.map((child) => {
                return <Branch key={child.id} item={child} level={newLevel} />
            });
        }

        return null;
    };

    const toggleSelected = () => {
        setSelected(prev => !prev);
    };

    const onSelection = () => {
        console.log("selected item" , item);

    };

    return (
        <>
            <Node
                item={item}
                selected={selected}
                hasChildren={hasChildren}
                level={level}
                onToggle={toggleSelected}
                onSelection={onSelection}
            />

            {selected && renderBranches()}
        </>
    );
};

export default Branch;
