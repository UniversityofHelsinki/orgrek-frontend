import React from 'react';

const Node = ({ item, selected, hasChildren, level, onToggle, onSelection }) => {
    return (
        <div style={{ paddingLeft: `${level * 25}px`}}>
            {hasChildren && <button onClick={onToggle}>{selected ? '-' : '+'}</button>}
            <input type="hidden" value={item.id}></input>
            <span onClick={onSelection}>{item.nameFi}</span>
        </div>
    );
};

export default Node;
