import React from 'react';

const Node = ({ item, selected, hasChildren, level, onToggle, onSelection }) => {
    return (
        <div style={{ paddingLeft: `${level * 35}px` }}>
            <span style={{ paddingRight: '10px' }} onClick={onSelection}>{level > 0 ? item.code : ''} {item.nameFi} {item.abbreviation ? '(' + item.abbreviation + ')' : ''}</span>
            {hasChildren && <i id={item.id} onClick={onToggle} className={selected ? 'arrow down' : 'arrow right'}></i>}
        </div>
    );
};

export default Node;
