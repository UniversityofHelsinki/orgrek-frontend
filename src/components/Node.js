import React from 'react';

const Node = ({ item, selected, hasChildren, level, onToggle }) => {
    return (
        <div style={{ paddingLeft: `${level * 25}px`}}>
            {hasChildren && <button onClick={onToggle}>{selected ? '-' : '+'}</button>}
            {item.nameFi}
        </div>
    );
};

export default Node;
